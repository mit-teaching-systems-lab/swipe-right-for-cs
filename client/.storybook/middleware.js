// This proxies requests to the development server
// Adapted from https://github.com/storybooks/storybook/issues/208#issuecomment-323251868
const proxy = require('http-proxy-middleware');
const packageJson = require('../package.json');

// Enable this to proxy to the development server
function proxyingMiddleware(router) { // eslint-disable-line no-unused-vars
  const proxyDomain = packageJson.proxy;
  console.log(`Proxying to ${proxyDomain}...`); //eslint-disable-line no-console
  router.use('/api', proxy({
    target: proxyDomain
  }));
}

function noopMiddleware(router) { }

module.exports = noopMiddleware; // eslint-disable-line no-undef