"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoryModel = void 0;
var mongoose_1 = require("mongoose");
var CategorySchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: [true, "missing name"],
        minLength: [2, "name too short"],
        maxLength: [15, "name too long"],
        unique: true,
    },
}, {
    versionKey: false,
});
exports.CategoryModel = (0, mongoose_1.model)("categories", // name of document collection
CategorySchema);
