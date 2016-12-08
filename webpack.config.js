const webpack = require("webpack");

module.exports = {
  entry: [
    "./calculator.js",
    "./main.js"
  ],
  output: {
    filename: "bundle.js"
  },
  module: {
    loaders: [
      {
        test: /\.less$/,
        loader: "style-loader!css-loader!less-loader"
      }
    ]
  },
  plugins: [new webpack.optimize.UglifyJsPlugin()]
};
