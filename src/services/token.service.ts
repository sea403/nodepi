import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { prisma } from "../db/prisma";
import ms from 'ms'

export function signAccessToken(userId: number) {
  return jwt.sign({ userId }, env.JWT_SECRET, {
    expiresIn: env.ACCESS_TOKEN_TTL,
  });
}

export async function issueRefreshToken(userId: number) {
  const jwtToken = jwt.sign({ userId }, env.REFRESH_TOKEN_SECRET, {
    expiresIn: env.REFRESH_TOKEN_TTL,
  });
  const exp = new Date(Date.now() + ms(env.REFRESH_TOKEN_TTL));
  await prisma.refreshToken.create({
    data: { token: jwtToken, userId, expiresAt: exp },
  });
  return jwtToken;
}

export async function rotateRefreshToken(oldToken: string) {
  const decoded = jwt.verify(oldToken, env.REFRESH_TOKEN_SECRET) as {
    userId: number;
    iat: number;
    exp: number;
  };
  const exists = await prisma.refreshToken.findUnique({
    where: { token: oldToken },
  });
  if (!exists || exists.expiresAt < new Date())
    throw new Error("Invalid refresh token");
  await prisma.refreshToken.delete({ where: { token: oldToken } });
  const newAccess = signAccessToken(decoded.userId);
  const newRefresh = await issueRefreshToken(decoded.userId);
  return { accessToken: newAccess, refreshToken: newRefresh };
}
