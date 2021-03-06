const _ = require('lodash');
const cors = require('cors');
const morgan = require('morgan');
const express = require('express');
const bodyParser = require('body-parser');
const methodOverride = require('method-override');

const logger = require('./logger');
const initRoutes = require('../app/routes');
const Responder = require('./expressresponder');

const app = express();

function initMiddleware() {
  app.set('showStackError', true);
  app.enable('jsonp callback');
  app.use(morgan('combined', _.pick(logger, 'stream')));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json({limit: '50mb'}));
  app.use(methodOverride());
  app.use(cors());
}

function catchNotFound() {
  app.use(Responder.notFound);
}

function catchErrorRoutes() {
  app.use((err, req, res, next) => {
    if (!err) return next();
    return Responder.operationFailed(res, err);
  });
}

function init() {
  // Initialize Middlewares
  initMiddleware();

  // Initialize API Routes
  initRoutes(app);

  // Initialize Not Found Route
  catchNotFound();

  // Initialize Error Routes
  catchErrorRoutes();

  return app;
}

module.exports.init = init;
