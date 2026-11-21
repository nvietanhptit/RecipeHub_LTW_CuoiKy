import { Router } from "express";
import {
  getUsers,
  lockUser,
  unlockUser,
} from "../controllers/userController.js";
import { idParamRule } from "../validators/categoryValidator.js";
import validate from "../middlewares/validate.js";
import { protect, authorize } from "../middlewares/auth.js";

const router = Router();

router.get("/", protect, authorize("admin"), getUsers);
router.patch(
  "/:id/lock",
  protect,
  authorize("admin"),
  idParamRule,
  validate,
  lockUser,
);
router.patch(
  "/:id/unlock",
  protect,
  authorize("admin"),
  idParamRule,
  validate,
  unlockUser,
);

export default router;
