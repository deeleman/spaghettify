const path = require('path');
const ForkTsCheckerWebpackPlugin = require('fork-ts-checker-webpack-plugin');

module.exports = (env, options) => ({
  entry: path.resolve(__dirname, 'src'),

  output: {
    filename: 'spaghettify.js',
    path: path.resolve(__dirname, options.mode === 'production' ? 'dist' : 'sandbox/temp'),
    library: 'Spaghettify',
  },

  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },

  devServer: {
    contentBase: path.join(__dirname, 'sandbox'),
    compress: false, // Falsey, otherwise download progress stream cannot be logged
    hot: true,
    inline: false,
    port: 3000,
    noInfo: true,
    onListening: function (server) {
      const port = server.listeningApp.address().port;
      console.log('🍝 Spaghettify is now bootstrapped at', `\x1b[33mhttp://localhost:${port}\x1b[0m`);
    },
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