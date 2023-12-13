const { createWebpackAliases } = require('./webpack.helpers');

/**
 * Export Webpack Aliases
 *
 * Tip: Some text editors will show the errors or invalid intellisense reports
 * based on these webpack aliases, make sure to update `tsconfig.json` file also
 * to match the `paths` we using in here for aliases in project.
 */
module.exports = createWebpackAliases({
  '@assets': 'assets',
  '@src': 'src',
  '@components': 'src/components',
  '@hooks': 'src/hooks',
  '@utils': 'src/utils',
  '@pages': 'src/pages',
  '@store': 'src/store',
  '@appTypes': 'src/types',
  '@api': 'src/api',
  '@constants': 'src/constants',
});
