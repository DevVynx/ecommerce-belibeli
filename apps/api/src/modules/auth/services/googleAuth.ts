import { emailToName } from "@/modules/auth/helpers/emailToName";
import { getTokenExpDate } from "@/modules/auth/helpers/getTokenExpDate";
import { handleGoogleAuthError } from "@/modules/auth/helpers/googleErrorMapper";
import { client } from "@/modules/auth/helpers/oAuth2ClientInstance";
import { generateAccessToken, generateRefreshToken } from "@/modules/auth/helpers/tokenGenerator";
import { authRepositories } from "@/modules/auth/repositories";
import { GoogleAuthParams } from "@/modules/auth/types/ServicesParams";
import { ENV } from "@/shared/utils/env";
import {
  BadRequestError,
  ForbiddenError,
  HttpError,
  InternalServerError,
} from "@/shared/utils/HttpErrors";

export const googleAuth = async ({ code }: GoogleAuthParams) => {
  try {
    const { tokens } = await client.getToken(code);
    if (!tokens) throw new BadRequestError("Código de autorização inválido ou expirado.");
    if (!tokens.id_token) throw new InternalServerError("Falha ao obter ID Token do Google.");

    const ticket = await client.verifyIdToken({
      idToken: tokens.id_token,
      audience: ENV.GOOGLE_CLIENT_ID,
    });

    const payload = ticket.getPayload();
    if (!payload) throw new InternalServerError("Falha ao obter dados do Google.");
    if (!payload.email_verified) throw new ForbiddenError("E-mail do Google não verificado.");

    const { sub, email, name } = payload;
    if (!email) throw new InternalServerError("Payload sem e-mail.");

    let user = await authRepositories.findUserByEmail({ email });

    if (!user) {
      user = await authRepositories.createUser({
        data: {
          email,
          name: name ?? emailToName(email),
          googleId: sub,
          isEmailVerified: true,
        },
        select: { id: true, name: true, email: true },
      });
    } else if (!user.googleId) {
      if (!user.isEmailVerified) {
        user = await authRepositories.updateUserById({
          userId: user.id,
          data: {
            name: name || user.name,
            googleId: sub,
            password: null,
            isEmailVerified: true,
          },
          select: { id: true, name: true, email: true },
        });
      } else {
        user = await authRepositories.updateUserById({
          userId: user.id,
          data: {
            name: name || user.name,
            googleId: sub,
          },
          select: { id: true, name: true, email: true },
        });
      }
    }

    const accessToken = generateAccessToken(user.id, user.name, user.email);
    const refreshToken = generateRefreshToken(user.id);

    await authRepositories.createRefreshToken({
      refreshToken: { token: refreshToken, expiresAt: getTokenExpDate(refreshToken) },
      userId: user.id,
    });

    return { user, accessToken, refreshToken };
  } catch (error) {
    if (error instanceof HttpError) throw error;
    throw handleGoogleAuthError(error);
  }
};
