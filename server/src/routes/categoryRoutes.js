import { Router } from "express";
import {
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
} from "../controllers/categoryController.js";
import { categoryRules, idParamRule } from "../validators/categoryValidator.js";
import validate from "../middlewares/validate.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = Router();

// Công khai
router.get("/", getCategories);

// Chỉ admin
router.post(
  "/",
  protect,
  authorize("admin"),
  categoryRules,
  validate,
  createCategory,
);
router.put(
  "/:id",
  protect,
  authorize("admin"),
  idParamRule,
  categoryRules,
  validate,
  updateCategory,
);
router.delete(
  "/:id",
  protect,
  authorize("admin"),
  idParamRule,
  validate,
  deleteCategory,
);

export default router;
