import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";

export const getUsers = async () => {
  return User.find().sort({ createdAt: -1 });
};

export const setUserActive = async (id, isActive, requesterId) => {
  if (id === requesterId) {
    throw new ApiError(400, "Không thể tự khóa tài khoản của chính mình");
  }

  const user = await User.findById(id);
  if (!user) {
    throw new ApiError(404, "Không tìm thấy tài khoản");
  }

  user.isActive = isActive;
  await user.save();
  return user;
};
