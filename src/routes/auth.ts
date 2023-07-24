import { Router } from "express";
import { AuthenticateController } from "../controller/AuthenticateController";

const authRouter = Router();
const authenticateController = new AuthenticateController();

authRouter.post("/", authenticateController.auth);

export { authRouter };
