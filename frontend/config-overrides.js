const { alias } = require('react-app-rewire-alias');

module.exports = function override(config) {
  alias({
    '@api': 'src/api',
    '@core': 'src/core',
    '@store': 'src/store',
    '@features': 'src/features',
    '@views': 'src/views',
    '@components': 'src/shared/components',
    '@shared': 'src/shared',
    '@utils': 'src/shared/utils',
  })(config);

  return config;
};