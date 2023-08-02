"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var winston_1 = require("winston");
var logger = (0, winston_1.createLogger)({
    level: "info",
    transports: [
        // new transports.Console(),
        new winston_1.transports.File({ filename: "./logs/logger.log" }),
    ],
    format: winston_1.format.combine(winston_1.format.timestamp({ format: "YYYY-MM-dd hh:mm:ss" }), winston_1.format.printf(function (log) { return "".concat(log.level, "\t ").concat(log.timestamp, " \t ").concat(log.message); })),
});
exports.default = logger;
// log levels:
// 0 - error
// 1 - warn
// 2 - info
// 3 - http
// 4 - verbose
// 5 - debug
// 6 - silly
