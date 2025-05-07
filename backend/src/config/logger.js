import winston from "winston";

const logger = winston.createLogger({
  level: "debug",
  format: winston.format.combine(
    winston.format.errors({ stack: true }),
    winston.format.timestamp(),
    winston.format.printf(({ timestamp, level, message, stack }) => {
      return `${timestamp} ${level}: ${message}${stack ? "\n" + stack : ""}`;
    })
  ),
  transports: [
    new winston.transports.Console({
      handleExceptions: true,
      format: winston.format.combine(
        winston.format.colorize({ all: true }),
        winston.format.timestamp(),
        winston.format.printf(({ timestamp, level, message, stack }) => {
          return `${timestamp} ${level}: ${message}${
            stack ? "\n" + stack : ""
          }`;
        })
      ),
    }),
  ],
  exitOnError: false,
});

export default logger;

export const stream = {
  write(message) {
    logger.info(message.trim());
  },
};
