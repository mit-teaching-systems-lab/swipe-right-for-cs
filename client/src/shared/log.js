// Log and report
function warn(...params) {
  if (window.Rollbar) {
    window.Rollbar.warn(...params);
  }
  console.warn(...params); //eslint-disable-line no-console
}

// Log and report
function error(...params) {
  if (window.Rollbar) {
    window.Rollbar.error(...params);
  }
  console.error(...params); //eslint-disable-line no-console
}

module.exports = {warn, error}; //eslint-disable-line no-undef