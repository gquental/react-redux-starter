var path = require('path');

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
      }
    ]
  }
}
