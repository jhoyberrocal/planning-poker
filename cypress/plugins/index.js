/**
 * @type {Cypress.PluginConfig}
 */
const { startDevServer } = require('@cypress/webpack-dev-server');

const webpack = {
  webpackOptions: require('www/webpack.config.js'),
};

module.exports = (on, config) => {
  on('dev-server:start', (options) => {
    return startDevServer({options, webpackConfig: webpack.webpackOptions });
  });
  return config;
}
