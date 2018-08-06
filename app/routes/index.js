const initTweetRoutes = require("./tweet");

function initRoutes(app) {
  app.use("/tweets", initTweetRoutes());
}

module.exports = initRoutes;
