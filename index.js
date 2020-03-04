let config = {};

/**
 *
 * @param {String} [level="INFO"]
 * @param {Object} [logger=console] Any custom logger instance used in the codebase, by default `console` will be used
 * @param {String} [serviceName] Default value will be picked up from the `name` key `package.json`
 */
function RequestLogger(level, logger, serviceName) {
  config.level = (level || 'INFO').toLowerCase();
  config.serviceName = serviceName || require.main.require('./package').name;
  config.logger = logger || console;
}

RequestLogger.prototype.log = function(req, res, next) {
  const { level, serviceName, logger } = config;
  res.on('finish', () => {
    const msg = {
      level,
      responseCode: res.statusCode,
      uri: req.path,
      requestId: res.getHeader('request-id') || null,
      service: serviceName,
    };
    const logLevelMap = {
      info: () => {
        logger.log(JSON.stringify(msg));
      },
      error: () => {
        if (res.statusCode >= 400) {
          logger.log(JSON.stringify(msg));
        }
      },
    };
    logLevelMap[level] && logLevelMap[level]();
  });
  next();
};

module.exports = RequestLogger;
