import express from "express";
import controller from "../controller/user-controller";

const router = express.Router();

router.get("/single/:id", controller.getUser);
router.get("/check-user-id/:id", controller.checkUserId);
router.get("/check-user-email/:email", controller.checkUserEmail);
router.get("/all", controller.getAllUsers);
router.post("/all/register", controller.register);
router.post("/all/login", controller.login);
router.patch("/all/update/:id", controller.updateUser);
router.delete("/all/delete/:id", controller.deleteUser);

export default router;
