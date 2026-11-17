import { Router } from "express";
import { protect, authorize } from "../middlewares/auth.js";

const router = Router();

router.get("/ping", protect, authorize("admin"), (req, res) => {
  res.status(200).json({ message: `Xin chào admin ${req.user.name}` });
});

export default router;
