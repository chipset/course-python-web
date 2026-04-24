# Step 5 — Display Results and Handle Errors

In this step you will create `templates/results.html` — the page that shows the computed statistics in a formatted table. You will also verify that the app handles bad input gracefully.

## What to do

Open [templates/results.html](open:templates/results.html) and add the following:

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

## Test the full flow

Start the app and try both happy and error paths:

```bash
python app.py
```

1. Go to `http://127.0.0.1:5000`
2. Enter `1, 2, 3, 4, 5` and click **Analyze** — you should see the results table
3. Go back and enter `hello, world` — you should see a red error message on the form

## What to expect

`templates/results.html` exists with a table that renders `results.count`, `results.mean`, `results.median`, `results.stdev`, and a link back to `/`.
