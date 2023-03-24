const winston = require('winston');

const { combine, colorize, timestamp, simple, printf } = winston.format;

const customFormat = combine(
  colorize(),
  timestamp({ format: 'YYYY/MM/DD HH:mm:ss.SSS' }),
  simple(),
  printf(({ level, message, timestamp }) => {
    return `${timestamp} [${level}]: ${message}`;
  })
);

const logger = winston.createLogger({
  level: 'info',
  format: customFormat,
  transports: [new winston.transports.Console()],
  timezone: 'America/Sao_Paulo',
});

module.exports = logger;
