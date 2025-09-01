import { prisma } from "../db/prisma";

export async function listTodos(userId: number) {
  return prisma.todo.findMany({ where: { userId }, orderBy: { id: "desc" } });
}

export async function createTodo(userId: number, title: string) {
  return prisma.todo.create({ data: { title, userId } });
}

export async function updateTodo(
  userId: number,
  id: number,
  data: Partial<{ title: string; completed: boolean }>
) {
  return prisma.todo.update({ where: { id, userId }, data });
}

export async function deleteTodo(userId: number, id: number) {
  return prisma.todo.delete({ where: { id, userId } });
}
