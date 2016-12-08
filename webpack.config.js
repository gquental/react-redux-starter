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
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  module: {
    rules: [
      {
        test: /(js|jsx)/,
        loader: 'babel-loader',
        options: {
          presets: ['es2015', 'react', 'stage-2']
        }
      },
      {
        test: /\.css$/,
        loader: extractCSS.extract([
          {
            loader: 'css-loader',
            options: {
              modules: true
            }
          }
        ]),
        include: /node_modules/
      },
      {
        test: /\.(png|jpg|gif|woff|woff2|eot|ttf)$/,
        loader: 'url-loader?limit=8192',
        include: /node_modules/
      },
      {
        test: /\.(mp4|ogg|svg)$/,
        loader: 'file-loader',
        include: /node_modules/
      }
    ]
  },
  plugins: [
    extractCSS
  ]
}
