const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, 'build'),
    filename: 'threeTestBundle.js'
  },
  
  watch: true,
  module: {
    rules: [
      { test: /\.js$/,
        exclude: /node_modules/,
        loader: "babel-loader" },
      { test: /\.(json|obj)$/,
        loader: "file-loader",
        options: {
          name: '[name].[ext]'
        }},
    ]
  },
  
  plugins: [
      new HtmlWebpackPlugin({template: './src/index.html'}),
  ]
  
};