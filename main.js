import app from './src/app';

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

app.listen(3000, '0.0.0.0');
