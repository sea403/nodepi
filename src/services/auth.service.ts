import bcrypt from "bcryptjs";
import { prisma } from "../db/prisma";
import { ApiError } from "../errors/ApiError";
import { signAccessToken, issueRefreshToken } from "./token.service";

export async function register(email: string, name: string, password: string) {
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) throw ApiError.badRequest("Email already in use");
  const passwordHash = await bcrypt.hash(password, 10);
  const user = await prisma.user.create({
    data: { email, name, passwordHash },
  });
  const accessToken = signAccessToken(user.id);
  const refreshToken = await issueRefreshToken(user.id);
  return {
    user: { id: user.id, email: user.email, name: user.name },
    accessToken,
    refreshToken,
  };
}

export async function login(email: string, password: string) {
  const user = await prisma.user.findUnique({ where: { email } });
  if (!user) throw ApiError.unauthorized("Invalid credentials");
  const ok = await bcrypt.compare(password, user.passwordHash);
  if (!ok) throw ApiError.unauthorized("Invalid credentials");
  const accessToken = signAccessToken(user.id);
  const refreshToken = await issueRefreshToken(user.id);
  return {
    user: { id: user.id, email: user.email, name: user.name },
    accessToken,
    refreshToken,
  };
}
