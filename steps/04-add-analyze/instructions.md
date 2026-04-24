# Step 4 — Handle the Form and Compute Statistics

In this step you will add the `/analyze` route that receives the form data, parses the numbers, and computes five statistics using Python's built-in `statistics` module.

## What to do

Open [app.py](open:app.py) and replace its contents with the following:

```python
from flask import Flask, render_template, request
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

## Key points

- `request.form.get('numbers', '')` reads the submitted form field by name
- The list comprehension `[float(x.strip()) for x in raw.split(',') if x.strip()]` parses the input safely
- `statistics.mean()`, `statistics.median()`, and `statistics.stdev()` come from the standard library — no extra install needed
- Invalid input (letters, empty string) is caught by `except ValueError` and re-renders the form with an error message

## What to expect

`app.py` defines a `/analyze` route that accepts POST, imports the `statistics` module, and passes a `results` dict to `render_template`.
