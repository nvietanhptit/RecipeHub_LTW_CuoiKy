import * as authService from "../services/authService.js";

export const register = async (req, res) => {
  const { name, email, password } = req.body;
  const { user, token } = await authService.registerUser({
    name,
    email,
    password,
  });
  res.status(201).json({ user, token });
};

export const login = async (req, res) => {
  const { email, password } = req.body;
  const { user, token } = await authService.loginUser({ email, password });
  res.status(200).json({ user, token });
};
