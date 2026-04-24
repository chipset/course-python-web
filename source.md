# Building a Python Web App with Flask

This guide walks through building a small but complete web application using [Flask](https://flask.palletsprojects.com/), Python's lightweight web framework. By the end you will have a running site that accepts a list of numbers from the user, performs statistical analysis on them, and displays the results in a formatted HTML page.

## What you will build

A single-page Flask web application that:

- Serves an HTML form where the user enters a comma-separated list of numbers
- Processes the submission server-side in Python
- Computes the count, sum, mean, median, and standard deviation
- Returns a results page with the values formatted in a table
- Handles invalid input gracefully with a user-friendly error message

The finished project looks like this:

```
flask-stats/
├── app.py          # Flask application
├── requirements.txt
└── templates/
    ├── index.html  # Input form
    └── results.html # Results table
```

---

## Prerequisites

- Python 3.8 or later installed
- `pip` available on your PATH
- Basic familiarity with Python functions and lists

---

## Step 1 — Install Flask and create the project

Create a `requirements.txt` file listing Flask as a dependency, then install it:

```
flask>=3.0
```

Install with:

```bash
pip install -r requirements.txt
```

Verify the installation:

```bash
python -c "import flask; print(flask.__version__)"
```

---

## Step 2 — Create the Flask application

Create `app.py` with a minimal Flask app that serves a home page:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return '<h1>Flask Stats</h1><p>App is running.</p>'

if __name__ == '__main__':
    app.run(debug=True)
```

Run the app:

```bash
python app.py
```

Flask starts a development server at `http://127.0.0.1:5000`. You should see the heading in your browser.

---

## Step 3 — Add HTML templates

Flask uses the Jinja2 templating engine. Templates live in a `templates/` folder beside `app.py`.

Create `templates/index.html`:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Flask Stats</title>
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 60px auto; padding: 0 16px; }
    input[type=text] { width: 100%; padding: 8px; font-size: 16px; }
    button { margin-top: 12px; padding: 8px 24px; font-size: 16px; cursor: pointer; }
    .error { color: crimson; margin-top: 8px; }
  </style>
</head>
<body>
  <h1>Number Stats</h1>
  <p>Enter a comma-separated list of numbers:</p>
  <form method="post" action="/analyze">
    <input type="text" name="numbers" placeholder="1, 2, 3, 4, 5" required>
    <br>
    <button type="submit">Analyze</button>
  </form>
  {% if error %}
  <p class="error">{{ error }}</p>
  {% endif %}
</body>
</html>
```

Update `app.py` to render the template:

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
```

---

## Step 4 — Handle the form submission and compute statistics

Add a `/analyze` route that accepts `POST` requests. Parse the submitted numbers, compute statistics using Python's `statistics` module (standard library — no extra dependencies), and pass the results to a template.

Update `app.py`:

```python
from flask import Flask, render_template, request, redirect, url_for
import statistics

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/analyze', methods=['POST'])
def analyze():
    raw = request.form.get('numbers', '')
    try:
        numbers = [float(x.strip()) for x in raw.split(',') if x.strip()]
        if not numbers:
            raise ValueError('No numbers provided.')
    except ValueError as e:
        return render_template('index.html', error=str(e))

    results = {
        'count':  len(numbers),
        'sum':    sum(numbers),
        'mean':   statistics.mean(numbers),
        'median': statistics.median(numbers),
        'stdev':  statistics.stdev(numbers) if len(numbers) > 1 else 0,
    }
    return render_template('results.html', numbers=numbers, results=results)

if __name__ == '__main__':
    app.run(debug=True)
```

The `statistics` module is part of the Python standard library. `statistics.mean()`, `statistics.median()`, and `statistics.stdev()` handle the maths.

---

## Step 5 — Display results and handle errors

Create `templates/results.html` to show the computed statistics in a clean table and link back to the form:

```html
<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>Results — Flask Stats</title>
  <style>
    body { font-family: sans-serif; max-width: 600px; margin: 60px auto; padding: 0 16px; }
    table { border-collapse: collapse; width: 100%; margin-top: 16px; }
    th, td { text-align: left; padding: 10px 14px; border-bottom: 1px solid #ddd; }
    th { background: #f5f5f5; }
    a { display: inline-block; margin-top: 24px; }
  </style>
</head>
<body>
  <h1>Results</h1>
  <p>Input: <strong>{{ numbers | join(', ') }}</strong></p>
  <table>
    <tr><th>Statistic</th><th>Value</th></tr>
    <tr><td>Count</td><td>{{ results.count }}</td></tr>
    <tr><td>Sum</td><td>{{ results.sum }}</td></tr>
    <tr><td>Mean</td><td>{{ '%.4f' | format(results.mean) }}</td></tr>
    <tr><td>Median</td><td>{{ results.median }}</td></tr>
    <tr><td>Std Dev</td><td>{{ '%.4f' | format(results.stdev) }}</td></tr>
  </table>
  <a href="/">← Analyze another set</a>
</body>
</html>
```

With error handling already in `/analyze`, submitting non-numeric input (e.g. `"a, b, c"`) returns the user to the form with a readable error message rather than a 500 page.

---

## Running the finished app

```bash
python app.py
```

Open `http://127.0.0.1:5000`, enter some numbers, and click **Analyze**. You should see a results table with all five statistics.

---

## Key concepts covered

| Concept | Where used |
|---|---|
| Flask app factory | `app.py` — `Flask(__name__)` |
| Route definitions | `@app.route('/')`, `@app.route('/analyze', methods=['POST'])` |
| Jinja2 templates | `templates/index.html`, `templates/results.html` |
| Form data access | `request.form.get('numbers')` |
| Python `statistics` module | `statistics.mean()`, `statistics.median()`, `statistics.stdev()` |
| Error handling in routes | `try/except ValueError` returns the form with an error message |
| Template variables | `{{ results.mean }}`, `{{ numbers | join(', ') }}` |
