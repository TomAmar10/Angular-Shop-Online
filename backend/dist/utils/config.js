"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.config = void 0;
var dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
var mongo_userName = process.env.MONGO_USERNAME || "";
var mongo_password = process.env.MONGO_PASSWORD || "";
var mongo_url = "mongodb+srv://".concat(mongo_userName, ":").concat(mongo_password, "@cluster0.xmfwbnk.mongodb.net/?retryWrites=true&w=majority");
// const mongo_url = `mongodb://127.0.0.1:27017`;
var server_port = process.env.PORT ? +process.env.PORT : 3200;
exports.config = {
    mongo: {
        url: mongo_url,
    },
    server: {
        port: server_port,
    },
};
