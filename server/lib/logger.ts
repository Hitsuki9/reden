import { createLogger, format, transports } from 'winston';

const { combine, colorize, timestamp, printf } = format;
const { Console } = transports;

export const logger = createLogger({
  format: combine(
    colorize(),
    timestamp(),
    printf(
      ({ level, timestamp, message }) => `[${timestamp} - ${level}] ${message}`
    )
  ),
  transports: [new Console()]
});
