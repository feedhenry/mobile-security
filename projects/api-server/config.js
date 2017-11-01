const config = {
  environment: process.env.NODE_ENV || 'dev',
  server: {
    port: process.env.PORT || 8080
  },
  mongo: {
    url: process.env.MONGO_DB_URI || 'mongodb://localhost/secure-backend'
  },
  keycloak: {
    realm: 'secure-app',
    clientId: 'api-server',
    bearerOnly: true,
    serverUrl: process.env.KEYCLOAK_URL || 'http://localhost:9090/auth',
    'ssl-required': 'external',
    resource: 'api-server'
  }
};

module.exports = config;
