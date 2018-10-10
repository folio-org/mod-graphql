// Simple wrapper for stripes-logger that configures from environment

const Logger = require('@folio/stripes-logger');

module.exports = class {
  constructor(prefix, timestamp) {
    return new Logger(process.env.LOGGING_CATEGORIES, prefix, timestamp);
  }
};
