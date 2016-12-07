var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true });

module.exports = {
  entry: {
    main: './src/index.jsx'
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  module: {
    rules: [
      {
        test: /(js|jsx)/,
        loader: "babel-loader",
        options: {
          presets: ["es2015", "react", "stage-2"]
        }
      },
      {
        test: /\.css$/,
        exclude: /node_modules/,
        loader: extractCSS.extract("css-loader")
      }
    ]
  },
  plugins: [
    extractCSS
  ]
}
