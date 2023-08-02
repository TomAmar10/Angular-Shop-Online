import express from "express";
import controller from "../controller/order-controller";

const router = express.Router();

router.get("/single/recipe/:id", controller.getRecipe);
router.get("/single/:id", controller.getOrder);
router.get("/all", controller.getAllOrders);
router.get("/all/by-cart/:cartId", controller.getCartOrders);
router.get("/all/by-user/:userId", controller.getUserOrders);
router.post("/all/add", controller.addOrder);
router.patch("/all/update/:id", controller.updateOrder);
router.delete("/all/delete/:id", controller.deleteOrder);

export default router;
