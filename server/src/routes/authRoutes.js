import { Router } from "express";
import { register, login, getMe } from "../controllers/authController.js";
import { registerRules, loginRules } from "../validators/authValidator.js";
import validate from "../middlewares/validate.js";
import { protect } from "../middlewares/auth.js";

const router = Router();

router.post("/register", registerRules, validate, register);
router.post("/login", loginRules, validate, login);
router.get("/me", protect, getMe);

export default router;
