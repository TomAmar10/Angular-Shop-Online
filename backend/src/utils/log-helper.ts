import { transports, createLogger, format } from "winston";

const logger = createLogger({
  level: "info",
  transports: [
    // new transports.Console(),
    new transports.File({ filename: "./logs/logger.log" }),
  ],
  format: format.combine(
    format.timestamp({ format: "YYYY-MM-dd hh:mm:ss" }),
    format.printf((log) => `${log.level}\t ${log.timestamp} \t ${log.message}`)
  ),
});

export default logger;

// log levels:
// 0 - error
// 1 - warn
// 2 - info
// 3 - http
// 4 - verbose
// 5 - debug
// 6 - silly
