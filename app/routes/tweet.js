const express = require("express");
const TweetController = require("../controllers/tweet");

const initTweetRoutes = () => {
  const TweetRouter = express.Router();

  TweetRouter.post("/", TweetController.addTweet);

  TweetRouter.get("/", TweetController.getTweets);

  TweetRouter.get("/:uid", TweetController.getTweetByUid);

  return TweetRouter;
}

module.exports = initTweetRoutes;
