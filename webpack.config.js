var path = require('path');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var extractCSS = new ExtractTextPlugin({ filename: 'bundle.css', disable: false, allChunks: true });
var webpack = require('webpack');

var plugins = [
  extractCSS,
  new webpack.DefinePlugin({
    'process.env': {
      'NODE_ENV': JSON.stringify('production')
    }
  })
];

var entry = {
  main: [
    'webpack-dev-server/client?http://localhost:8080',
    'webpack/hot/only-dev-server',
    './src/index.jsx'
  ]
}

if (process.env.NODE_ENV == "production") {
  plugins.push(
    new webpack.optimize.UglifyJsPlugin({
      compress:{
        warnings: true
      }
    })
  );

  entry.main = './src/index.jsx'
} else {
  plugins.push(
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NamedModulesPlugin()
  )
}


module.exports = {
  entry: entry,
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: '[name].js'
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  devServer: {
    hot: true,
    // activate hot reloading

    contentBase: path.resolve(__dirname, 'dist'),
    // match the output path

    publicPath: '/'
    // match the output `publicPath`
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
  plugins: plugins
}
