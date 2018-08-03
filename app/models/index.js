const _ = require("lodash");
const config = require("config");
const Sequelize = require("sequelize");

const db = config.sequelize;

const sequelize = new Sequelize(db.name, db.user, db.pass, db.settings);

module.exports = {
  sequelize
};
