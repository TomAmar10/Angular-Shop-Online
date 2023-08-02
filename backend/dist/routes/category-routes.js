"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var category_controller_1 = __importDefault(require("../controller/category-controller"));
var router = express_1.default.Router();
router.get("/single/:id", category_controller_1.default.getCategory);
router.get("/all", category_controller_1.default.getAllCategories);
router.post("/all/add", category_controller_1.default.addCategory);
router.patch("/all/update/:id", category_controller_1.default.updateCategory);
router.delete("/all/delete/:id", category_controller_1.default.deleteCategory);
exports.default = router;
