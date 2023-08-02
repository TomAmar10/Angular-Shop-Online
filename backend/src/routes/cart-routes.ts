import express from "express";
import controller from "../controller/cart-controller";

const router = express.Router();

router.get("/single/:id", controller.getCart);
router.get("/all", controller.getAllCarts);
router.get("/all/by-user/:userId", controller.getUserCarts);
router.post("/all/add", controller.addCart);
router.patch("/all/update/:id", controller.updateCart);
router.delete("/all/delete/:id", controller.deleteCart);

export default router;
