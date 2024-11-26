import Logger from './src/configuredLogger.js';
import modGraphql from './src/app.js';

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

const logger = new Logger();
const httpServer = modGraphql(process.argv.slice(2));
/*
const port = 3001; // XXX should provide a way to change this
logger.log('listen', `listening on port ${port}`);
await new Promise(resolve => httpServer.listen({ port }, resolve));
console.log('🚀 Server ready 2');
*/
