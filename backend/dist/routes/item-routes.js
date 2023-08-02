"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var item_controller_1 = __importDefault(require("../controller/item-controller"));
var router = express_1.default.Router();
router.get("/single/:id", item_controller_1.default.getItem);
router.get("/all", item_controller_1.default.getAllItems);
router.get("/all/by-category/:categoryId", item_controller_1.default.getCategoryItems);
router.post("/all/add", item_controller_1.default.addItem);
router.patch("/all/update/:id", item_controller_1.default.updateItem);
router.delete("/all/delete/:id", item_controller_1.default.deleteItem);
exports.default = router;
