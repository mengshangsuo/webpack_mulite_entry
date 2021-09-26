
const path = require('path');
const fs = require('fs');
const commonConfig = require('./webpack.config');

const prodConfig = {
  mode: 'production',
  devtool: 'none',
};

module.exports = commonConfig(prodConfig);