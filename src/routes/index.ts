import { Router } from "express";
import { usersRoutes } from './user'
import { authRouter } from "./auth";
import { clientsRoutes } from "./client";
import { projectsRoutes } from "./project";

const router = Router();
const prefixRouter = "/api/v1"

router.use(`${prefixRouter}/authentication`, authRouter);
router.use(`${prefixRouter}/users`, usersRoutes);
router.use(`${prefixRouter}/clients`, clientsRoutes);
router.use(`${prefixRouter}/projects`, projectsRoutes)

export { router }