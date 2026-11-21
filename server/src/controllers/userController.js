import * as userService from "../services/userService.js";

export const getUsers = async (req, res) => {
  const users = await userService.getUsers();
  res.status(200).json({ users });
};

export const lockUser = async (req, res) => {
  const user = await userService.setUserActive(
    req.params.id,
    false,
    req.user.id,
  );
  res.status(200).json({ user });
};

export const unlockUser = async (req, res) => {
  const user = await userService.setUserActive(
    req.params.id,
    true,
    req.user.id,
  );
  res.status(200).json({ user });
};
