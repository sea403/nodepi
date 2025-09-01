import { Router } from "express";
import * as AuthCtrl from "../controllers/auth.controller";
import { validate } from "../middlewares/validate";
import { registerSchema, loginSchema } from "../schemas/auth.schema";
import { auth } from "../middlewares/auth";

const router = Router();

/**
 * @openapi
 * /api/auth/register:
 * post:
 * tags: [Auth]
 * requestBody:
 * required: true
 * responses:
 * 201: { description: Created }
 */
router.post("/register", validate(registerSchema), AuthCtrl.register);
router.post("/login", validate(loginSchema), AuthCtrl.login);
router.post("/refresh", AuthCtrl.refresh);
router.get("/me", auth, AuthCtrl.me);

export default router;
