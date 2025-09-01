import { Request, Response, NextFunction } from "express";
import { ApiError } from "./ApiError";
import { logger } from "../config/logger";

export function errorHandler(
  err: unknown,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (err instanceof ApiError) {
    return res
      .status(err.status)
      .json({ message: err.message, details: err.details });
  }
  logger.error({ err }, "Unhandled error");
  return res.status(500).json({ message: "Internal Server Error" });
}
