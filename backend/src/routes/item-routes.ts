import express from "express";
import controller from "../controller/item-controller";

const router = express.Router();

router.get("/single/:id", controller.getItem);
router.get("/all", controller.getAllItems);
router.get("/all/by-category/:categoryId", controller.getCategoryItems);
router.post("/all/add", controller.addItem);
router.patch("/all/update/:id", controller.updateItem);
router.delete("/all/delete/:id", controller.deleteItem);

export default router;
