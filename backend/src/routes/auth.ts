import { Router } from "express";
import { validateSchema } from "../middlewares/validateSchema";
import { authenticate } from "../middlewares/auth";
import { AuthController } from "../controllers/auth.controller";
import { loginSchema, registerSchema } from "../validations/user.schema";

const authRouter = Router();
const authController = new AuthController();

authRouter.post('/login', validateSchema(loginSchema), authController.login);
authRouter.post('/register', authenticate, validateSchema(registerSchema), authController.register);

export default authRouter;
export {authRouter as Router};