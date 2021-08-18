const { resolve } = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCssAssetsWebpackPlugin = require("optimize-css-assets-webpack-plugin");

const { merge } = require("webpack-merge");
const commonConfigConstructor = require("./webpack.config");

process.env.NODE_ENV = "production";

module.exports = merge(commonConfigConstructor(), {
  mode: "production",

  devtool: "source-map",

  plugins: [
    // css代码单独抽离
    new MiniCssExtractPlugin({
      filename: "css/bundle.css",
    }),
    // css代码压缩
    new OptimizeCssAssetsWebpackPlugin(),
  ],
});
