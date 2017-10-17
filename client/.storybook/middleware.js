// This proxies requests to the development server
// Adapted from https://github.com/storybooks/storybook/issues/208#issuecomment-323251868
const proxy = require('http-proxy-middleware');
const packageJson = require('../package.json');

module.exports = function expressMiddleware(router) { // eslint-disable-line no-undef
  const proxyDomain = packageJson.proxy;
  console.log(`Proxying to ${proxyDomain}...`); //eslint-disable-line no-console
  router.use('/api', proxy({
    target: proxyDomain
  }));
};