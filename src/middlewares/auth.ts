import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { env } from "../config/env";
import { ApiError } from "../errors/ApiError";

export interface JwtPayload {
  userId: number;
}

export function auth(req: Request, _res: Response, next: NextFunction) {
  const header = req.headers.authorization;
  const token = header?.startsWith("Bearer ") ? header.slice(7) : undefined;
  if (!token) return next(ApiError.unauthorized());
  try {
    const payload = jwt.verify(token, env.JWT_SECRET) as JwtPayload;
    req.user = { id: payload.userId };
    next();
  } catch {
    next(ApiError.unauthorized("Invalid token"));
  }
}
