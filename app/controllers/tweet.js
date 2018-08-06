const BadRequestError = require('../errors/badrequest');
const Responder = require("../../lib/expressresponder");
const { Tweet } = require('../models');



class TweetController {
  static async addTweet(req, res) {
    try {
      const { content } = req.body;
      if (!content) {
        throw BadRequestError('Content required!');
      }

      const tweet = await Tweet.create({content});

      Responder.created(res, tweet)
    } catch (error) {
      Responder.operationFailed(res, error);
    }
  }
}

module.exports = TweetController;