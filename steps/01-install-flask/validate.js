module.exports = async function validate(context) {
  if (!await context.files.exists('requirements.txt')) {
    return context.fail('requirements.txt not found. It should be in the workspace root.');
  }

  const req = await context.files.read('requirements.txt');
  if (!req.toLowerCase().includes('flask')) {
    return context.fail('requirements.txt does not list flask as a dependency.');
  }

  const { stdout, exitCode } = await context.terminal.run('python -c "import flask; print(flask.__version__)"');
  if (exitCode !== 0) {
    return context.fail('Flask does not appear to be installed. Run: pip install -r requirements.txt');
  }

  return context.pass(`Flask ${stdout.trim()} is installed and ready.`);
};
