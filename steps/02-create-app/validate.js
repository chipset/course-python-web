module.exports = async function validate(context) {
  if (!await context.files.exists('app.py')) {
    return context.fail('app.py not found. Create it in the workspace root.');
  }

  const src = await context.files.read('app.py');

  if (!src.includes('Flask(__name__)')) {
    return context.fail('app.py must create a Flask app instance: app = Flask(__name__)');
  }

  if (!src.includes("@app.route('/')") && !src.includes('@app.route("/")')) {
    return context.fail("app.py must define a route for '/'. Add @app.route('/') above your index function.");
  }

  const { exitCode } = await context.terminal.run('python -c "import ast; ast.parse(open(\'app.py\').read())"');
  if (exitCode !== 0) {
    return context.fail('app.py has a syntax error. Check the file and try again.');
  }

  return context.pass('app.py looks great — Flask app created with a home route.');
};
