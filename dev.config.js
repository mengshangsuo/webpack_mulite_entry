
const path = require('path');
const commonConfig = require('./webpack.config');

const devConfig = {
  mode: 'development',
  devtool: 'source-map',
};



module.exports = commonConfig(devConfig);