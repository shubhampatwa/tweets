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

  static async getTweetByUid(req, res) {
    try {
      const { uid } = req.params;
      if (!uid) {
        throw new BadRequestError(`Missing property uid`);
      }

      const tweet = await Tweet.findById(uid);

      if (!tweet) {
        throw new BadRequestError(`No Tweet exist with uid \`${uid}\``);
      }
      
      Responder.success(res, tweet);
    } catch (error) {
      Responder.operationFailed(res, error);      
    }
  }

  static async updateTweetByUid(req, res) {
    try {
      const [uid, content] = [req.params.uid, req.body.content];
      if (!uid) {
        throw new BadRequestError('Missing property `uid`');
      }
      console.log(uid, ">>>")
      const tweet = await Tweet.findById(uid);

      if (!tweet) {
        throw new BadRequestError(`No Tweet exist with uid \`${uid}\``);
      }

      if (!content) {
        throw new BadRequestError('Missing property `content`');
      }

      await tweet.update({content});

      Responder.created(res, {message: `Tweet with uid \`${uid}\` updated successfully!`});
    } catch (error) {
      Responder.operationFailed(res, error);      
    }
  }
}

module.exports = TweetController;