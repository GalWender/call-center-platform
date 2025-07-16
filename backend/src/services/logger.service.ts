import fs from 'fs';

type LogLevel = 'DEBUG' | 'INFO' | 'WARN' | 'ERROR';

const logsDir = './logs';
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir);
}

function getTime(): string {
  return new Date().toLocaleString('he');
}

function isError(e: unknown): e is Error {
  return e instanceof Error;
}

function doLog(level: LogLevel, ...args: unknown[]) {
  const strs = args.map(arg => {
    if (typeof arg === 'string') return arg;
    if (isError(arg)) return arg.stack || arg.message;
    return JSON.stringify(arg);
  });

  const line = `${getTime()} - ${level} - ${strs.join(' | ')}`;

  // Output to console for development visibility
  console.log(line);

  // Also write to file
  fs.appendFile('./logs/backend.log', line + '\n', err => {
    if (err) console.error('LOGGER FILE WRITE ERROR:', err);
  });
}

export const logger = {
  debug(...args: unknown[]) {
    if (process.env.NODE_ENV === 'production') return;
    doLog('DEBUG', ...args);
  },
  info(...args: unknown[]) {
    doLog('INFO', ...args);
  },
  warn(...args: unknown[]) {
    doLog('WARN', ...args);
  },
  error(...args: unknown[]) {
    doLog('ERROR', ...args);
  },
};
