import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/db/prisma";

const email = "t1@example.com";
const password = "password123";

beforeAll(async () => {
  await prisma.$connect();
});

afterAll(async () => {
  await prisma.refreshToken.deleteMany();
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

test("register -> login -> me", async () => {
  const r1 = await request(app)
    .post("/api/auth/register")
    .send({ email, name: "T1", password });
  expect(r1.status).toBe(201);
  expect(r1.body.user.email).toBe(email);

  const r2 = await request(app)
    .post("/api/auth/login")
    .send({ email, password });
  expect(r2.status).toBe(200);
  const token = r2.body.accessToken as string;

  const r3 = await request(app)
    .get("/api/auth/me")
    .set("Authorization", `Bearer ${token}`);
  expect(r3.status).toBe(200);
  expect(r3.body.userId).toBeDefined();
});
