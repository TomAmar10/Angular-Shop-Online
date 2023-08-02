"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var order_controller_1 = __importDefault(require("../controller/order-controller"));
var router = express_1.default.Router();
router.get("/single/recipe/:id", order_controller_1.default.getRecipe);
router.get("/single/:id", order_controller_1.default.getOrder);
router.get("/all", order_controller_1.default.getAllOrders);
router.get("/all/by-cart/:cartId", order_controller_1.default.getCartOrders);
router.get("/all/by-user/:userId", order_controller_1.default.getUserOrders);
router.post("/all/add", order_controller_1.default.addOrder);
router.patch("/all/update/:id", order_controller_1.default.updateOrder);
router.delete("/all/delete/:id", order_controller_1.default.deleteOrder);
exports.default = router;
