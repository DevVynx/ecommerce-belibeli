import { createRefreshToken } from "@/modules/auth/repositories/createRefreshToken";
import { createUser } from "@/modules/auth/repositories/createUser";
import { deleteManyRefreshTokensByUserId } from "@/modules/auth/repositories/deleteManyRefreshTokensByUserId";
import { deleteRefreshTokenByToken } from "@/modules/auth/repositories/deleteRefreshTokenByToken";
import { findRefreshTokenByToken } from "@/modules/auth/repositories/findRefreshTokenByToken";
import { findUserByEmail } from "@/modules/auth/repositories/findUserByEmail";
import { findUserById } from "@/modules/auth/repositories/findUserById";
import { markRefreshTokenAsUsed } from "@/modules/auth/repositories/markRefreshTokenAsUsed";

export const authRepositories = {
  findUserByEmail,
  findUserById,
  findRefreshTokenByToken,
  createUser,
  createRefreshToken,
  markRefreshTokenAsUsed,
  deleteManyRefreshTokensByUserId,
  deleteRefreshTokenByToken,
};
