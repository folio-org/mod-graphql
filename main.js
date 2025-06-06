import Logger from './src/configuredLogger.js';
import modGraphql from './src/app.js';

const logger = new Logger();
const httpServer = await modGraphql(logger, process.argv.slice(2));

if (process.env.CONSOLE_TRACE) {
  // The code by Remy Sharp
  // https://remysharp.com/2014/05/23/where-is-that-console-log/
  /* eslint-disable no-console */
  ['log', 'warn'].forEach((method) => {
    const old = console[method];
    console[method] = (...callerArgs) => {
      let stack = (new Error()).stack.split(/\n/);
      // Chrome includes a single "Error" line, FF doesn't.
      if (stack[0].indexOf('Error') === 0) {
        stack = stack.slice(1);
      }
      const args = callerArgs.concat([stack[1].trim()]);
      return old.apply(console, args);
    };
  });
}

const port = 3001; // XXX should provide a way to change this
await new Promise(resolve2 => httpServer.listen({ port }, resolve2));
logger.log('listen', `listening on port ${port}`);
