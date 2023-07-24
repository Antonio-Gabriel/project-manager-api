import { Router } from "express";
import multer from "multer";
import multerConfig from "../config/multer";
import { ProjectController } from "../controller/ProjectController";
import { authenticate } from "../middlewares/auth";

const projectsRoutes = Router();
const projectController = new ProjectController();

projectsRoutes.use(authenticate);

projectsRoutes.get("/", projectController.index);
projectsRoutes.get("/:id", projectController.show);
projectsRoutes.get("/users/:id", projectController.showProjectsUsers);
projectsRoutes.get("/search", projectController.search);
projectsRoutes.get("/paginated", projectController.paginated);
projectsRoutes.post(
  "/",
  multer(multerConfig).single("logo"),
  projectController.create
);
projectsRoutes.put(
  "/:id/upload",
  multer(multerConfig).single("logo"),
  projectController.uploadImage
);
projectsRoutes.put("/:id", projectController.update);
projectsRoutes.patch('/status/:id', projectController.changeStatus);
projectsRoutes.delete("/:id", projectController.destroy);

export { projectsRoutes };
