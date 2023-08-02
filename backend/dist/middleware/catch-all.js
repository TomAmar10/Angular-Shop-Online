"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var log_helper_1 = __importDefault(require("../utils/log-helper"));
var catchAll = function (err, request, response, next) {
    if (err) {
        console.log(err.message);
        log_helper_1.default.error(err.message);
        response
            .status(err.status || 500)
            .json({ status: err.status || 500, msg: err.message });
        return;
    }
    next();
};
exports.default = catchAll;
