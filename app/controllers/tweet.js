const _ = require('lodash');

const BadRequestError = require('../errors/badrequest');
const Responder = require("../../lib/expressresponder");
const { Tweet } = require('../models');



class TweetController {
  static async addTweet(req, res) {
    try {
      const { content } = req.body;
      if (!content) {
        throw new BadRequestError('Content required!');
      }

      const tweet = await Tweet.create({content});

      Responder.created(res, tweet)
    } catch (error) {
      Responder.operationFailed(res, error);
    }
  }

  static async getTweets(req, res) {
    try {
      const required = ['count', 'order'];
      const missingprop = _.find(required, prop => !_.has(req.query, prop))
      if(missingprop) {
        throw new BadRequestError(`Missing property \`${missingprop}\``);
      }
      const { count, order } = req.query;
      if (isNaN(count)) {
        throw new BadRequestError('Invalid count params passed!');
      }

      if (!_.includes(['ASC', 'DESC'], _.upperCase(order))) {
        throw new BadRequestError('Invalid order params passed!');
      }

      const tweets = await Tweet.findAll({
        limit: parseInt(count),
        order: [['created_at', order]]
      });

      Responder.success(res, tweets);
    } catch (error) {
      Responder.operationFailed(res, error);
    }
  }
}

module.exports = TweetController;