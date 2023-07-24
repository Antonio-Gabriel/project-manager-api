import { Router } from "express";
import { UserController } from '../controller/UserController'

const usersRoutes = Router();

const userController = new UserController();

usersRoutes.get("/", userController.index);
usersRoutes.post("/", userController.create);
usersRoutes.put("/:id", userController.update);
usersRoutes.patch("/:id", userController.enable);
usersRoutes.delete("/:id", userController.destroy);

export { usersRoutes }