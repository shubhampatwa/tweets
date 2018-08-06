const config = require("config");
const Sequelize = require("sequelize");
const _ = require("lodash");

const TweetSchema = (sequelize) => {
  return sequelize.define("tweet", {
    uid: {
      type: Sequelize.UUID,
      defaultValue:  Sequelize.UUIDV4,
      primaryKey: true
    },
    content: {
      type: Sequelize.TEXT,
      allowNull: false,
      required: true
    }
  });
};

module.exports = TweetSchema;