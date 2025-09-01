import { Router } from "express";
import * as TodoCtrl from "../controllers/todo.controller";
import { auth } from "../middlewares/auth";
import { validate } from "../middlewares/validate";
import { createTodoSchema, updateTodoSchema } from "../schemas/todo.schema";

const router = Router();

router.use(auth);
router.get("/", TodoCtrl.list);
router.post("/", validate(createTodoSchema), TodoCtrl.create);
router.patch("/:id", validate(updateTodoSchema), TodoCtrl.update);
router.delete("/:id", TodoCtrl.destroy);

export default router;
