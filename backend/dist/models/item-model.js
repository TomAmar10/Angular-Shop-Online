"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ItemModel = void 0;
var mongoose_1 = require("mongoose");
var ItemsSchema = new mongoose_1.Schema({
    categoryId: {
        type: mongoose_1.Schema.Types.ObjectId,
        required: [true, "missing category"],
        minLength: [2, "category too short"],
        maxLength: [100, "category too long"],
        trim: true,
        ref: "categories",
    },
    name: {
        type: String,
        required: [true, "missing operation type"],
        minLength: [2, "name too short"],
        maxLength: [25, "name too long"],
        unique: true,
    },
    price: {
        type: Number,
        required: [true, "missing price"],
        min: [0, "price too low"],
    },
    image: {
        type: String,
        required: [true, "image price"],
    },
}, {
    versionKey: false,
});
exports.ItemModel = (0, mongoose_1.model)("items", // name of document collection
ItemsSchema);
