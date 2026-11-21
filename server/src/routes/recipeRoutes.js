import { Router } from "express";
import {
  getRecipes,
  getRecipeById,
  getPendingRecipes,
  approveRecipe,
  rejectRecipe,
} from "../controllers/recipeController.js";
import { idParamRule } from "../validators/categoryValidator.js";
import validate from "../middlewares/validate.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = Router();

router.get("/", getRecipes);

router.get("/pending", protect, authorize("admin"), getPendingRecipes);

router.get("/:id", idParamRule, validate, getRecipeById);

router.patch(
  "/:id/approve",
  protect,
  authorize("admin"),
  idParamRule,
  validate,
  approveRecipe,
);
router.delete(
  "/:id/reject",
  protect,
  authorize("admin"),
  idParamRule,
  validate,
  rejectRecipe,
);

export default router;
