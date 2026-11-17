import User from "../models/User.js";
import ApiError from "../utils/ApiError.js";
import generateToken from "../utils/generateToken.js";

export const registerUser = async ({ name, email, password }) => {
  const existing = await User.findOne({ email });
  if (existing) {
    throw new ApiError(409, "Email đã được sử dụng");
  }

  const user = await User.create({ name, email, password });
  const token = generateToken(user.id);
  return { user, token };
};

export const loginUser = async ({ email, password }) => {
  const user = await User.findOne({ email }).select("+password");
  const isMatch = user && (await user.comparePassword(password));

  if (!isMatch) {
    throw new ApiError(401, "Email hoặc mật khẩu không đúng");
  }
  if (!user.isActive) {
    throw new ApiError(403, "Tài khoản đã bị khóa");
  }

  const token = generateToken(user.id);
  return { user, token };
};
