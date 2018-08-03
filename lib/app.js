const config = require('config');
const express = require('./express');
const http = require('http');
const sequelize = require('./sequelize');

async function start() {
  const app = express.init();

  await sequelize.connect();

  return http.createServer(app).listen(config.port);
}

module.exports = start;
