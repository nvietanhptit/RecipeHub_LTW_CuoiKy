import jwt from "jsonwebtoken";
import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

export const protect = async (req, res, next) => {
  const header = req.headers.authorization;
  if (!header || !header.startsWith("Bearer ")) {
    throw new ApiError(401, "Vui lòng đăng nhập");
  }

  const token = header.split(" ")[1];

  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (error) {
    throw new ApiError(401, "Token không hợp lệ hoặc đã hết hạn");
  }

  const user = await User.findById(decoded.id);
  if (!user) {
    throw new ApiError(401, "Tài khoản không còn tồn tại");
  }
  if (!user.isActive) {
    throw new ApiError(403, "Tài khoản đã bị khóa");
  }

  req.user = user;
  next();
};

export const authorize =
  (...roles) =>
  (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      throw new ApiError(403, "Bạn không có quyền thực hiện hành động này");
    }
    next();
  };
