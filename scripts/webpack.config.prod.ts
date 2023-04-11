import path from 'path';
import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import { merge } from 'webpack-merge';
import BaseConfig from './webpack.config.base';

const config: Configuration = {
  mode: 'production',
  output: {
    publicPath: '/',
  },
  plugins: BaseConfig.plugins?.concat([
    new CopyWebpackPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, '../public'),
          to: path.resolve(__dirname, '../build'),
          toType: 'dir',
        },
      ],
    }),
    new CleanWebpackPlugin()]
  ),
};

export default merge(BaseConfig, config);
