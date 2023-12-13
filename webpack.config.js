const path = require('path');

const ENV =
  process.env.NODE_ENV !== 'production' ? 'development' : 'production';

module.exports = require(path.resolve(
  __dirname,
  'webpack',
  `webpack.config.${ENV}.js`,
));
