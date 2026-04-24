module.exports = async function validate(context) {
  if (!await context.files.exists('templates/index.html')) {
    return context.fail('templates/index.html not found. Create the templates/ folder and add index.html.');
  }

  const html = await context.files.read('templates/index.html');

  if (!html.includes('action="/analyze"') && !html.includes("action='/analyze'")) {
    return context.fail('The form in index.html must POST to /analyze. Check the action attribute.');
  }

  if (!html.includes('name="numbers"') && !html.includes("name='numbers'")) {
    return context.fail('The form input must have name="numbers" so the server can read it.');
  }

  const src = await context.files.read('app.py');
  if (!src.includes('render_template')) {
    return context.fail('app.py must use render_template. Import it from flask and call render_template(\'index.html\').');
  }

  return context.pass('Templates wired up — index.html renders correctly from app.py.');
};
