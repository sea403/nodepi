import { Request, Response, NextFunction } from "express";
import * as Todos from "../services/todo.service";

export async function list(req: Request, res: Response, next: NextFunction) {
  try {
    res.json(await Todos.listTodos(req.user!.id));
  } catch (e) {
    next(e);
  }
}
export async function create(req: Request, res: Response, next: NextFunction) {
  try {
    res.status(201).json(await Todos.createTodo(req.user!.id, req.body.title));
  } catch (e) {
    next(e);
  }
}
export async function update(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    res.json(await Todos.updateTodo(req.user!.id, id, req.body));
  } catch (e) {
    next(e);
  }
}
export async function destroy(req: Request, res: Response, next: NextFunction) {
  try {
    const id = Number(req.params.id);
    await Todos.deleteTodo(req.user!.id, id);
    res.status(204).send();
  } catch (e) {
    next(e);
  }
}
