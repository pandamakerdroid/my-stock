const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@core': 'src/core',
    '@store': 'src/store',
    '@features': 'src/features',
    '@pages': 'src/pages',
    '@components': 'src/shared/components',
    '@shared': 'src/shared',
    '@utils': 'src/shared/utils',
  })(config);

  return config;
};