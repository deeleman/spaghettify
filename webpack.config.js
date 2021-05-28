const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env, options) => ({
  entry: path.resolve(__dirname, 'src'),

  watch: options.mode === 'development',

  output: {
    filename: 'spaghettify.js',
    path: path.resolve(__dirname, options.mode === 'production' ? 'dist' : 'sandbox/bin'),
    library: 'Spaghettify',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  module: {
    rules: [
      { 
        test: /\.(ts|js)x?$/,
        loader: 'babel-loader',
        exclude: /node_modules/
      }
    ],
  },

  plugins: [
    new ForkTsCheckerWebpackPlugin(),
  ]
});