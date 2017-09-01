const express    = require('express');
const mongoose   = require('mongoose');
const helmet     = require('helmet');
const bodyParser = require('body-parser');
const morgan     = require('morgan');
const bluebird   = require('bluebird');
const Keycloak   = require('keycloak-connect');
const session    = require('express-session');

const config = require('./config');
const routes = require('./routes');

const app  = express();

const memoryStore = new session.MemoryStore();
const keycloak = new Keycloak({ store: memoryStore }, config.keycloak);

mongoose.Promise = bluebird;
mongoose.connect(config.mongo.url);

app.use(helmet());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(morgan('tiny'));
app.use(session({
  secret:'secret',
  resave: false,
  saveUninitialized: true,
  store: memoryStore
}));

app.use(keycloak.middleware());

app.use('/', keycloak.protect(), routes);

app.listen(config.server.port, () => {
  console.log(`Magic happens on port ${config.server.port}`);
});

module.exports = app;
