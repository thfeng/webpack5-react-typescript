import path from 'path';
import {
  Configuration,
  HotModuleReplacementPlugin,
  WebpackOptionsNormalized,
} from 'webpack';
import { merge } from 'webpack-merge';
import BaseConfig from './webpack.config.base';

const BundleAnalyzerPlugin =
  require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const config: Configuration | WebpackOptionsNormalized = {
  mode: 'development',
  plugins: BaseConfig.plugins?.concat([
    new HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin({
      openAnalyzer: false,
    }),
  ]),
  devtool: 'cheap-module-source-map',
  devServer: {
    static: {
      directory: path.join(__dirname, '../public'),
    },
    historyApiFallback: true,
    port: 9000,
  },
};
export default merge(BaseConfig, config);
