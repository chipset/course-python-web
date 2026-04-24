module.exports = async function validate(context) {
  if (!await context.files.exists('app.py')) {
    return context.fail('app.py not found.');
  }

  const src = await context.files.read('app.py');

  if (!src.includes('import statistics')) {
    return context.fail("app.py must import the statistics module. Add: import statistics");
  }

  if (!src.includes('/analyze')) {
    return context.fail("app.py must define an /analyze route. Add @app.route('/analyze', methods=['POST']).");
  }

  if (!src.includes("methods=['POST']") && !src.includes('methods=["POST"]')) {
    return context.fail("The /analyze route must accept POST requests. Add methods=['POST'] to the route decorator.");
  }

  if (!src.includes('statistics.mean')) {
    return context.fail('The analyze function must compute the mean using statistics.mean(numbers).');
  }

  if (!src.includes('request.form')) {
    return context.fail("The analyze function must read form data using request.form. Make sure to import request from flask.");
  }

  const { exitCode } = await context.terminal.run('python -c "import ast; ast.parse(open(\'app.py\').read())"');
  if (exitCode !== 0) {
    return context.fail('app.py has a syntax error. Check the file carefully.');
  }

  return context.pass('The /analyze route is set up correctly and computes all statistics.');
};
