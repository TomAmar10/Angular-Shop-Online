"use strict";
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = __importDefault(require("mongoose"));
var item_model_1 = require("../models/item-model");
var addItem = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var item, newItem;
    return __generator(this, function (_a) {
        item = request.body;
        newItem = new item_model_1.ItemModel(__assign({ _id: new mongoose_1.default.Types.ObjectId() }, item));
        return [2 /*return*/, newItem
                .save()
                .then(function (item) { return response.status(201).json(item); })
                .catch(function (err) { return next(err); })];
    });
}); };
var getItem = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var itemId;
    return __generator(this, function (_a) {
        itemId = request.params.id;
        return [2 /*return*/, item_model_1.ItemModel.findById(itemId)
                .populate("categoryId")
                .then(function (item) {
                item
                    ? response.status(200).json(item)
                    : response.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var getAllItems = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        return [2 /*return*/, item_model_1.ItemModel.find()
                .populate("categoryId")
                .then(function (items) {
                items
                    ? response.status(200).json(items)
                    : response.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var getCategoryItems = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var categoryId;
    return __generator(this, function (_a) {
        categoryId = request.params.categoryId;
        console.log(categoryId);
        return [2 /*return*/, item_model_1.ItemModel.find({ categoryId: categoryId })
                .populate("categoryId")
                .then(function (items) {
                items
                    ? response.status(200).json(items)
                    : response.status(200).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var updateItem = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var itemId;
    return __generator(this, function (_a) {
        itemId = request.params.id;
        return [2 /*return*/, item_model_1.ItemModel.findById(itemId)
                .then(function (item) {
                if (item) {
                    item.set(request.body);
                    return item
                        .save()
                        .then(function (item) { return response.status(201).json(item); })
                        .catch(function (err) { return response.status(500).json(err); });
                }
                else {
                    response.status(404).json({ message: "not found" });
                }
            })
                .catch(function (err) { return next(err); })];
    });
}); };
var deleteItem = function (request, response, next) { return __awaiter(void 0, void 0, void 0, function () {
    var itemId;
    return __generator(this, function (_a) {
        itemId = request.params.id;
        return [2 /*return*/, item_model_1.ItemModel.findByIdAndDelete(itemId)
                .then(function (item) {
                return item
                    ? response.status(201).json({ message: "deleted" })
                    : response.status(404).json({ message: "not found" });
            })
                .catch(function (err) { return next(err); })];
    });
}); };
exports.default = {
    getItem: getItem,
    getAllItems: getAllItems,
    addItem: addItem,
    updateItem: updateItem,
    deleteItem: deleteItem,
    getCategoryItems: getCategoryItems,
};
