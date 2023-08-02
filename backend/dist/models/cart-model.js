"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CartModel = void 0;
var mongoose_1 = require("mongoose");
var CartsSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "missing user"],
        minLength: [2, "user id too short"],
        maxLength: [100, "user id too long"],
        trim: true,
        ref: "users",
    },
    created: {
        type: Date,
        default: new Date(),
    },
    items: [
        {
            type: mongoose_1.Schema.Types.ObjectId,
            ref: "items",
        },
    ],
}, {
    versionKey: false,
});
exports.CartModel = (0, mongoose_1.model)("carts", // name of document collection
CartsSchema);
