const path = require('path');
const htmlWebpackPlugin = require('html-webpack-plugin');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const ESLintPlugin = require('eslint-webpack-plugin');
const paths = require('./paths');
const InterpolateHtmlPlugin = require('interpolate-html-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// public 文件目标目录
const publicPath = 'public',
  // css 提取文件命名
  localIdentName = '[path][name]__[local]--[hash:base64:5]',
  outputFileNameConstructor = (devMode) => (devMode ? '[name].js' : '[name].[contenthash:8].js'),
  imageFileName = '[name].[hash:8].[ext]';

module.exports = () => {
  const devMode = process.env.NODE_ENV !== 'production';

  const commonCssLoader = [
    devMode ? 'style-loader' : MiniCssExtractPlugin.loader,
    {
      loader: 'css-loader',
      options: {
        modules: {
          auto: true,
          localIdentName,
        },
      },
    },
    'postcss-loader',
  ];

  return {
    entry: paths.appJsConfig,
    output: {
      path: paths.appBuild,
      filename: outputFileNameConstructor(),
      // publicPath: '/html/',
    },

    module: {
      rules: [
        {
          test: /\.css$/,
          use: commonCssLoader,
        },
        {
          test: /\.(sa|sc)ss$/,
          use: [...commonCssLoader, 'sass-loader'],
        },
        {
          test: /\.(png|jpg|jpeg|gif)$/,
          use: {
            loader: 'url-loader',
            options: {
              limit: 8 * 1024,
              name: imageFileName,
              esModule: false,
              outputPath: 'images',
            },
          },
        },
        {
          test: /\.(woff|woff2|eot|ttf|mp3|mp4|gltf|obj|mtl)$/,
          use: {
            loader: 'file-loader',
            options: {
              esModule: false,
              outputPath: 'assets',
            },
          },
        },
        {
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        },
        {
          test: /\.(js|mjs|jsx|ts|tsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
          },
        },
      ],
    },
    plugins: [
      new InterpolateHtmlPlugin({
        PUBLIC_URL: publicPath,
      }),
      new htmlWebpackPlugin({
        template: paths.appHtml,
        filename: 'index.html',
      }),
      new ESLintPlugin({
        fix: true,
      }),
      new CopyWebpackPlugin({
        patterns: [
          {
            from: paths.appPublic,
            to: publicPath,
            filter: async (resourcePath) => path.resolve(resourcePath) !== paths.appHtml,
          },
        ],
      }),
      new CleanWebpackPlugin(),
    ],
    resolve: {
      extensions: paths.moduleFileExtensions.map((ext) => `.${ext}`),
      alias: {
        '@': paths.appSrc,
        '@common': path.resolve(paths.appSrc, './common'),
        '@style': path.resolve(paths.appSrc, './common/style'),
        '@utils': path.resolve(paths.appSrc, './common/utils'),
        '@components': path.resolve(paths.appSrc, './components'),
        '@services': path.resolve(paths.appSrc, './services'),
      },
    },
  };
};
