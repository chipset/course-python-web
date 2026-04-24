# Step 2 — Create the Flask Application

In this step you will create `app.py` — the entry point for your web application.

Flask apps are built around a central `Flask` object that maps URL routes to Python functions. Each function returns the content shown to the user when they visit that URL.

## What to do

Open [app.py](open:app.py) and write the following:

```python
from flask import Flask

app = Flask(__name__)

@app.route('/')
def index():
    return '<h1>Flask Stats</h1><p>App is running.</p>'

if __name__ == '__main__':
    app.run(debug=True)
```

Then start the app to confirm it runs:

```bash
python app.py
```

You should see output like:
```
 * Running on http://127.0.0.1:5000
```

Press `Ctrl+C` to stop it when done.

## What to expect

The file `app.py` exists, imports Flask, creates an `app` instance, and defines at least one route decorated with `@app.route('/')`.
