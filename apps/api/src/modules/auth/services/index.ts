import { findUserById } from "./findUserById";
import { googleAuth } from "./googleAuth";
import { login } from "./login";
import { logout } from "./logout";
import { refreshAccessToken } from "./refreshAccessToken";
import { register } from "./register";

export const authServices = {
  login,
  logout,
  register,
  refreshAccessToken,
  findUserById,
  googleAuth,
};
