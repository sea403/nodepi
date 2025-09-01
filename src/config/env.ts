import "dotenv/config";

function required(name: string, val: string | undefined) {
  if (!val) throw new Error(`Missing env: ${name}`);
  return val;
}

export const env = {
  NODE_ENV: process.env.NODE_ENV ?? "development",
  PORT: Number(process.env.PORT ?? 3333),
  DATABASE_URL: required("DATABASE_URL", process.env.DATABASE_URL),
  JWT_SECRET: required("JWT_SECRET", process.env.JWT_SECRET),
  REFRESH_TOKEN_SECRET: required(
    "REFRESH_TOKEN_SECRET",
    process.env.REFRESH_TOKEN_SECRET
  ),
  ACCESS_TOKEN_TTL: process.env.ACCESS_TOKEN_TTL ?? "15m",
  REFRESH_TOKEN_TTL: process.env.REFRESH_TOKEN_TTL ?? "7d",
};
