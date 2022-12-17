import { Configuration } from 'webpack';
import { CleanWebpackPlugin } from 'clean-webpack-plugin';
import { merge } from 'webpack-merge';
import BaseConfig from './webpack.config.base';

const config: Configuration = {
  mode: 'production',
  output: {
    publicPath: '/',
  },
  plugins: BaseConfig.plugins?.concat([new CleanWebpackPlugin()]),
};

export default merge(BaseConfig, config);
