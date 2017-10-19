// Load CSVs, like create-react-app
// Adapted from https://storybook.js.org/configurations/custom-webpack-config/#full-control-mode-default
const genDefaultConfig = require('@storybook/react/dist/server/config/defaults/webpack.config.js');
module.exports = (baseConfig, env) => { //eslint-disable-line no-undef
  const config = genDefaultConfig(baseConfig, env);

  // Add file-loader to load CSV files.
  // Adapted from https://github.com/facebookincubator/create-react-app/blob/v1.0.13/packages/react-scripts/config/webpack.config.dev.js#L220
  config.module.rules.push({
    test: /\.csv$/,
    loader: require.resolve('file-loader'),
    options: {
      name: 'static/media/[name].[hash:8].[ext]',
    },
  });

  return config;
};