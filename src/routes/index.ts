import { Router } from "express";
import auth from "./auth.routes";
import todos from "./todo.routes";

const router = Router();
router.use("/auth", auth);
router.use("/todos", todos);

export default router;