import { Request, Response, NextFunction } from "express";
import * as Auth from "../services/auth.service";
import { rotateRefreshToken } from "../services/token.service";

export async function register(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    const { email, name, password } = req.body;
    const result = await Auth.register(email, name, password);
    res.status(201).json(result);
  } catch (e) {
    next(e);
  }
}

export async function login(req: Request, res: Response, next: NextFunction) {
  try {
    const { email, password } = req.body;
    const result = await Auth.login(email, password);
    res.json(result);
  } catch (e) {
    next(e);
  }
}

export async function refresh(req: Request, res: Response, next: NextFunction) {
  try {
    const { refreshToken } = req.body as { refreshToken?: string };
    if (!refreshToken)
      return res.status(400).json({ message: "refreshToken required" });
    const tokens = await rotateRefreshToken(refreshToken);
    res.json(tokens);
  } catch (e) {
    next(e);
  }
}

export async function me(req: Request, res: Response) {
  res.json({ userId: req.user!.id });
}
