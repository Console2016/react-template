const path = require("path");
const { merge } = require("webpack-merge");
const commonConfigConstructor = require("./webpack.config");
const paths = require("./paths");

process.env.NODE_ENV = "development";

const webpackConfig = merge(commonConfigConstructor(), {
  mode: "development",

  devtool: "inline-source-map",

  // 使用webpck-dev-server时配置
  devServer: {
    // clientLogLevel: "error", // none, error, warning 或者 info
    compress: true,
    // contentBase: paths.appBuild,
    // publicPath: './js',
    // contentBase: './',
    hot: true,
    historyApiFallback: true,
    open: true,
    // noInfo: true,
    port: 3000,
    progress: true,
    // quiet: true,
    // useLocalIp: true,
    proxy: {
      // "/api": "http://localhost:3000",
      //   "/api": {
      //     target: "https://localhost:3000",
      //     pathRewrite: { "^/api": "" },
      //     secure: false
      //   },
    },

    // https: true
    // headers: {
    //   "X-Custom-Foo": "bar",
    // },
  },
});

module.exports = webpackConfig;
