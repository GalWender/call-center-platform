export type LogLevel = 'log' | 'info' | 'warn' | 'error' | 'debug';

function output(level: LogLevel, ...args: unknown[]) {
  if (import.meta.env.DEV) {
    const processedArgs = args.map(arg => {
      if (typeof arg === 'object' && arg !== null) {
        try {
          return JSON.stringify(arg, null, 2);
        } catch (e) {
          return '[Unserializable Object]';
        }
      }
      return arg;
    });

    console[level](...processedArgs);
  } else {
  }
}

export const logger = {
  log: (...args: unknown[]) => output('log', ...args),
  info: (...args: unknown[]) => output('info', ...args),
  warn: (...args: unknown[]) => output('warn', ...args),
  error: (...args: unknown[]) => output('error', ...args),
  debug: (...args: unknown[]) => output('debug', ...args),
};

export default logger;
