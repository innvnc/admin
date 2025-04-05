const createNextIntlPlugin = require( 'next-intl/plugin' );

const withNextIntl = createNextIntlPlugin();

const nextConfig = {
  webpackDevMiddleware: ( config ) => {
    config.watchOptions = {
      poll: 1000,
      aggregateTimeout: 300,
    };
    return config;
  },
};

module.exports = withNextIntl( nextConfig );
