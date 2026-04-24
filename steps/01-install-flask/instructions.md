# Step 1 — Install Flask

In this step you will declare Flask as a dependency and install it.

Flask is a lightweight Python web framework. Before writing any code, you need to record it as a project dependency and install it into your environment.

## What to do

A `requirements.txt` file has been created for you in the workspace. Install the dependency:

```bash
pip install -r requirements.txt
```

Then verify the installation succeeded:

```bash
python -c "import flask; print(flask.__version__)"
```

You should see a version number printed — something like `3.1.0`.

## What to expect

After running `pip install`, Flask and its dependencies (Werkzeug, Jinja2, etc.) will be available for import. The verify command exits cleanly with a version string.
