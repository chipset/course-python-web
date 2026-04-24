# Step 3 — Add HTML Templates

In this step you will move from returning raw HTML strings to using Jinja2 templates — Flask's built-in templating engine.

Templates keep your HTML separate from your Python logic. Flask looks for them in a `templates/` folder next to `app.py`.

## What to do

**1. Create `templates/index.html`:**

Open [templates/index.html](open:templates/index.html) and add the following:

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

**2. Update [app.py](open:app.py) to use the template:**

```python
from flask import Flask, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

if __name__ == '__main__':
    app.run(debug=True)
```

## What to expect

`templates/index.html` exists with a form that POSTs to `/analyze`. `app.py` imports and calls `render_template`.
