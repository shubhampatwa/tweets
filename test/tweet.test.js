const request = require('supertest');
const config = require('config');

const express = require('../lib/express');
const sequelize = require('../lib/sequelize');

describe(' j', () => {
  let app;

  before(async () => {
    app = express.init();
    await sequelize.connect();
  });

  describe('GET /user', () => {
    
    it('respond with json', function(done) {
      request(app)
      .get('/tweets?count=1&page=1&order=desc')
      .set('Accept', 'application/json')
      .expect('Content-Type', /json/)
      .expect(200, done);
    });
  });
})