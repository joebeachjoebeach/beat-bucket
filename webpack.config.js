const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const config = {
  entry: __dirname + '/src/index.jsx',
  module: {
    rules: [
      {
        test: /\.jsx?/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [ 
            { 
              loader: 'css-loader', 
              options: { importLoaders: 1 } 
            }, 
            { 
              loader: 'postcss-loader', 
              options: {
                ident: 'postcss',
                plugins: () => [ require('autoprefixer')() ]
              }
            }
          ]
        })
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
  plugins: [
    new ExtractTextPlugin('style.css')
  ]
};

module.exports = config;
