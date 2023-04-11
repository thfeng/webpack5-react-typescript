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
  exclude: /node_modules/,
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

const cssNodeModulesModule: RuleSetRule = {
  test: /\.css$/i,
  include: /node_modules/,
  use: [
    devMode
      ? 'style-loader'
      : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: './',
          },
        },
    'css-loader',
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
  exclude: /node_modules/,
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
          modifyVars: { '@primary-color': '#1CC855' },
          javascriptEnabled: true,
          sourceMap: true,
        },
      },
    },
  ],
};

const lessNodeModulesModule: RuleSetRule = {
  test: /\.less$/i,
  include: /node_modules/,
  use: [
    devMode
      ? 'style-loader'
      : {
          loader: MiniCssExtractPlugin.loader,
          options: {
            publicPath: './',
          },
        },
    'css-loader',
    'postcss-loader',
    {
      loader: 'less-loader',
      options: {
        lessOptions: {
          modifyVars: { '@primary-color': '#1CC855' },
          javascriptEnabled: true,
          sourceMap: true,
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
  type: 'asset/resource',
  parser: {
    dataUrlCondition: {
      maxSize: 30 * 1024,
    },
  },
  generator: {
    filename: 'images/[name].[hash:6][ext]',
    publicPath: devMode ? '/' : '/app-content/',
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
    quiet: true,
  }),
  new ForkTsCheckerWebpackPlugin({
    async: false,
  }),
];

const config: Configuration = {
  entry: path.resolve(__dirname, '../src/index.ts'),
  output: {
    library: 'react-ts-app',
    libraryTarget: 'umd',
    path: path.resolve(__dirname, '../build'),
    publicPath: '/',
    filename: 'js/[name].[contenthash].js',
    assetModuleFilename: 'assets/[name].[hash:6][ext]',
  },
  module: {
    rules: [
      cssModule,
      cssNodeModulesModule,
      lessModule,
      lessNodeModulesModule,
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
          filename: 'styles/[name].[contenthash].css',
        }),
      ],
};

export default config;
