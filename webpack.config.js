const webpack = require('webpack');
const config = {
  entry: __dirname + '/src/index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: 'babel-loader'
      }
    ]
  },
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js',
  },
  resolve: {
    extensions: ['.js', '.jsx', '.css']
  },
};
module.exports = config;
