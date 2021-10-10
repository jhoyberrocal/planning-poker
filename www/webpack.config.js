const webpack = require('webpack');
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const dotenv = require('dotenv');
const env = dotenv.config({ path: path.join(__dirname, '/.env') }).parsed;

const envKeys = Object.keys(env).reduce((prev, next) => {
  prev[`process.env.${next}`] = JSON.stringify(env[next]);
  return prev;
}, {});

module.exports = {
  mode: process.env.NODE_ENV || 'development',
  entry: './src/index.tsx',
  output: { path: path.join(__dirname, 'dist'), filename: 'index.bundle.js', publicPath: '/' },
  resolve: {
    extensions: [ '.tsx', '.ts', '.js' ],
    plugins: [
      new TsconfigPathsPlugin({
        configFile: path.join(__dirname, 'tsconfig.json'),
        extensions: [ '.js', '.ts', '.tsx' ]
      })
    ]
  },
  devServer: {
    historyApiFallback: true
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: [ 'babel-loader' ]
      },
      {
        test: /\.(ts|tsx)$/,
        exclude: /node_modules/,
        use: [ 'ts-loader' ]
      },
      {
        test: /\.(css|scss)$/,
        use: [ 'style-loader', 'css-loader' ]
      },
      {
        test: /\.(jpg|jpeg|png|gif|mp3|svg)$/,
        use: [ 'file-loader' ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.join(__dirname, 'src', 'index.html')
    }),
    new webpack.DefinePlugin(envKeys)
  ]
};
