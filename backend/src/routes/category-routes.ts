import express from "express";
import controller from "../controller/category-controller";

const router = express.Router();

router.get("/single/:id", controller.getCategory);
router.get("/all", controller.getAllCategories);
router.post("/all/add", controller.addCategory);
router.patch("/all/update/:id", controller.updateCategory);
router.delete("/all/delete/:id", controller.deleteCategory);

export default router;
