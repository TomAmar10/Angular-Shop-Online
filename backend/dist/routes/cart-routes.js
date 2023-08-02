"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var cart_controller_1 = __importDefault(require("../controller/cart-controller"));
var router = express_1.default.Router();
router.get("/single/:id", cart_controller_1.default.getCart);
router.get("/all", cart_controller_1.default.getAllCarts);
router.get("/all/by-user/:userId", cart_controller_1.default.getUserCarts);
router.post("/all/add", cart_controller_1.default.addCart);
router.patch("/all/update/:id", cart_controller_1.default.updateCart);
router.delete("/all/delete/:id", cart_controller_1.default.deleteCart);
exports.default = router;
