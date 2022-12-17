import path from 'path';
import { Configuration, RuleSetRule } from 'webpack';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ESLintPlugin from 'eslint-webpack-plugin';
import ForkTsCheckerWebpackPlugin from 'fork-ts-checker-webpack-plugin';
import WebpackBar from 'webpackbar';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import AppConfig from '../config/config';

const HtmlTemplateConfig = {
  base: AppConfig.base ?? '/',
  title: AppConfig.title,
  headScripts: AppConfig.headScripts,
  bodyScripts: AppConfig.bodyScripts,
  rootElementId: AppConfig.rootElementId,
};

const devMode = process.env.NODE_ENV !== 'production';

const cssModule: RuleSetRule = {
  test: /\.css$/i,
  use: [
    devMode
      ? 'style-loader'
      : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: './',
          },
        },
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[local]_[hash:base64:5]',
        },
      },
    },
    'postcss-loader',
  ],
};

const sassModule: RuleSetRule = {
  test: /\.s(a|c)ss$/,
  use: [
    devMode
      ? 'style-loader'
      : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: './',
          },
        },
    {
      loader: 'css-loader',
      options: {
        importLoaders: 2,
        modules: true,
      },
    },
    'postcss-loader',
    {
      loader: 'sass-loader',
    },
  ],
};

const lessModule: RuleSetRule = {
  test: /\.less$/i,
  use: [
    devMode
      ? 'style-loader'
      : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: './',
          },
        },
    {
      loader: 'css-loader',
      options: {
        modules: {
          localIdentName: '[local]_[hash:base64:5]',
        },
      },
    },
    'postcss-loader',
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          javascriptEnabled: true,
        },
      },
    },
  ],
};

const scriptModule = {
  test: /\.(t|j)sx?$/i,
  exclude: /node_modules/,
  loader: 'babel-loader',
};

const fontModule = {
  test: /\.(eot|woff|woff2|otf|tff|svg)/i,
  type: 'asset/resource',
};

const imageModule = {
  test: /\.(png|jpg|jpeg|gif)(\?|$)/i,
  type: 'asset',
  parser: {
    dataUrlCondition: {
      maxSize: 30 * 1024,
    },
  },
  generator: {
    filename: 'img/[name].[hash:6][ext]',
    publicPath: './',
  },
};

const jsonModule = {
  test: /\.json/i,
  include: path.resolve('../src', 'locales'),
  type: 'javascript/auto',
  generator: {
    filename: 'locales/[name][ext]',
  },
};

const plugins = [
  new WebpackBar(),
  new HtmlWebpackPlugin({
    base: HtmlTemplateConfig.base,
    config: HtmlTemplateConfig,
    template: path.resolve(__dirname, './template/index.ejs'),
  }),

  new ESLintPlugin({
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  }),
  new ForkTsCheckerWebpackPlugin({
    async: false,
  }),
];

const config: Configuration = {
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    path: path.resolve(__dirname, '../dist'),
    publicPath: '/',
    filename: '[name].[contenthash].js',
    assetModuleFilename: 'assets/[name].[hash:6][ext]',
  },
  module: {
    rules: [
      cssModule,
      lessModule,
      sassModule,
      scriptModule,
      fontModule,
      imageModule,
      jsonModule,
    ],
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
    alias: {
      '@@': path.resolve(__dirname, '../'),
      '@': path.resolve(__dirname, '../src'),
    },
  },
  plugins: devMode
    ? plugins
    : [
        ...plugins,
        new MiniCssExtractPlugin({
          filename: '[name]-[contenthash].css',
        }),
      ],
};

export default config;
