const webpack = require("webpack");
const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const { resolve } = require("path");

// TODO: If not used scss files, then need remove loader amd plugin
module.exports = {
  mode: "development",
  entry: [
    "react-hot-loader/patch",
    "./src/index.js"
  ],
  //devtool: "source-map",
  devtool: process.env.WEBPACK_DEVTOOL || "eval-source-map",
  output: {
    filename: "[name].bundle.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        loaders: [ "babel-loader" ],
      },
      {
        test: /\.(sa|sc)ss$/,
        exclude: /node_modules/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              hmr: true
            }
          },
          "css-loader",
          "postcss-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [ "style-loader", "css-loader" ]
      },
    ]
  },
  resolve: {
    extensions: [ ".js", ".jsx" ],
    modules: [
      "node_modules"
    ],
    symlinks: true,
  },

  devServer: {
    contentBase: resolve("public"),
    noInfo: true,
    open: true,
    compress: true,
    hot: false,
    historyApiFallback: true,
    port: 3030,
    writeToDisk: true
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: '[name].css',
      chunkFilename: '[id].css',
    }),
    new HtmlWebpackPlugin({ template: resolve("public", "index.html") }),
    new CleanWebpackPlugin(),
  ]
};