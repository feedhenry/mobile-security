const fs = require('fs');

const keycloakConfigPath = process.env.KEYCLOAK_CONFIG_PATH;

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

// read from file if the KEYCLOAK_CONFIG_PATH env variable is supplied
if (keycloakConfigPath) {
  try {
    config.keycloak = JSON.parse(fs.readFileSync(keycloakConfigPath, 'utf8'));
  } catch (e) {
    console.error(`Error reading keycloak config at ${keycloakConfigPath}\n${e}`);
    process.exit(1);
  }
}

module.exports = config;
