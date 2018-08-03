const winston = require('winston');
const fs = require('fs');
const config = require('config');

const logDir = 'logs';

// Create the log directory if it does not exist
if (!fs.existsSync(logDir)) {
  fs.mkdirSync(logDir);
}

winston.emitErrs = true;

const transports = [
  new winston.transports.File({
    level: config.loglevel,
    filename: `${logDir}/${config.loglevel}.log`,
    handleExceptions: true,
    json: true,
    maxsize: 10485760, // 10MB
    maxFiles: 5,
    colorize: false,
  }),
];

if (config.loglevel === 'debug') {
  transports.push(new winston.transports.Console({
    level: 'debug',
    handleExceptions: true,
    json: false,
    colorize: true,
  }));
}

const logger = new winston.Logger({
  transports: transports, exitOnError: false,
});

module.exports = logger;

module.exports.stream = {
  write: (message) => {
    logger.info(message);
  },
};
