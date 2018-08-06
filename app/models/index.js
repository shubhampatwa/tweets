const config = require("config");
const Sequelize = require("sequelize");

const TweetSchema = require("./tweet");
const db = config.sequelize;

const sequelize = new Sequelize(db.name, db.user, db.pass, db.settings);

const Tweet = TweetSchema(sequelize);

module.exports = {
  sequelize,
  Tweet
};
