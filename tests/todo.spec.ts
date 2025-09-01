import request from "supertest";
import app from "../src/app";
import { prisma } from "../src/db/prisma";

let token = "";

beforeAll(async () => {
  await prisma.$connect();
  await request(app)
    .post("/api/auth/register")
    .send({ email: "u@ex.com", name: "U", password: "password123" });
  const r = await request(app)
    .post("/api/auth/login")
    .send({ email: "u@ex.com", password: "password123" });
  token = r.body.accessToken;
});

afterAll(async () => {
  await prisma.refreshToken.deleteMany();
  await prisma.todo.deleteMany();
  await prisma.user.deleteMany();
  await prisma.$disconnect();
});

test("CRUD todos", async () => {
  const c = await request(app)
    .post("/api/todos")
    .set("Authorization", `Bearer ${token}`)
    .send({ title: "A" });
  expect(c.status).toBe(201);
  const id = c.body.id;

  const list = await request(app)
    .get("/api/todos")
    .set("Authorization", `Bearer ${token}`);
  expect(list.status).toBe(200);
  expect(Array.isArray(list.body)).toBe(true);

  const u = await request(app)
    .patch(`/api/todos/${id}`)
    .set("Authorization", `Bearer ${token}`)
    .send({ completed: true });
  expect(u.status).toBe(200);
  expect(u.body.completed).toBe(true);

  const d = await request(app)
    .delete(`/api/todos/${id}`)
    .set("Authorization", `Bearer ${token}`);
  expect(d.status).toBe(204);
});
