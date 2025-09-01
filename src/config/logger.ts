import pino from "pino";

export const logger = pino({
  transport:
    process.env.NODE_ENV !== "production"
      ? { target: "pino-pretty" }
      : undefined,

  level: process.env.NODE_ENV === "test" ? "error" : "info",
});
