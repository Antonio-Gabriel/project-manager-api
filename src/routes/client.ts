import { Router } from "express";
import { ClientController } from '../controller/ClientController'
import { authenticate } from '../middlewares/auth'

const clientsRoutes = Router();

const clientController = new ClientController();

clientsRoutes.use(authenticate);

clientsRoutes.get("/", clientController.index);
clientsRoutes.get("/paginated", clientController.paginated);
clientsRoutes.get("/search", clientController.search);
clientsRoutes.post("/", clientController.create);
clientsRoutes.put("/:id", clientController.update);
clientsRoutes.delete("/:id", clientController.destroy);

export { clientsRoutes }