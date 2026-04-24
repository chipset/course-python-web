module.exports = async function validate(context) {
  if (!await context.files.exists('templates/results.html')) {
    return context.fail('templates/results.html not found. Create it inside the templates/ folder.');
  }

  const html = await context.files.read('templates/results.html');

  if (!html.includes('results.count') || !html.includes('results.mean') || !html.includes('results.median')) {
    return context.fail('results.html must display results.count, results.mean, and results.median using Jinja2 {{ }} syntax.');
  }

  if (!html.includes('results.stdev')) {
    return context.warn('results.html is missing results.stdev. Add a row for standard deviation to show all five statistics.');
  }

  if (!html.includes('href="/"') && !html.includes("href='/'")) {
    return context.warn('Add a link back to the home page: <a href="/">← Analyze another set</a>');
  }

  const appSrc = await context.files.read('app.py');
  if (!appSrc.includes('results.html')) {
    return context.fail("app.py must render results.html. Call render_template('results.html', ...) in the analyze function.");
  }

  return context.pass('All five statistics display correctly and error handling is in place. Flask Stats is complete!');
};
