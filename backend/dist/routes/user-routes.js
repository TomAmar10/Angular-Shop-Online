"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = __importDefault(require("express"));
var user_controller_1 = __importDefault(require("../controller/user-controller"));
var router = express_1.default.Router();
router.get("/single/:id", user_controller_1.default.getUser);
router.get("/check-user-id/:id", user_controller_1.default.checkUserId);
router.get("/check-user-email/:email", user_controller_1.default.checkUserEmail);
router.get("/all", user_controller_1.default.getAllUsers);
router.post("/all/register", user_controller_1.default.register);
router.post("/all/login", user_controller_1.default.login);
router.patch("/all/update/:id", user_controller_1.default.updateUser);
router.delete("/all/delete/:id", user_controller_1.default.deleteUser);
exports.default = router;
