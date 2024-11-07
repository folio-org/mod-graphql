// Simple wrapper for stripes-logger that configures from environment

import Logger from '@folio/stripes-logger';

class ConfiguredLogger {
  constructor(prefix, timestamp) {
    return new Logger(process.env.LOGGING_CATEGORIES || process.env.LOGCAT, prefix, timestamp);
  }
};

export default ConfiguredLogger;
