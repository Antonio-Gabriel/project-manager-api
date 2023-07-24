import { Request, Response } from "express";
import { ListClientServices } from "../services/clients/ListClientServices";
import { CreateClientServices } from "../services/clients/CreateClientServices";
import { UpdateClientServices } from "../services/clients/UpdateClientServices";
import { DeleteClientServices } from "../services/clients/DeleteClientServices";
import { PaginatedClientServices } from "../services/clients/PaginatedClientServices";
import { SearchClientServices } from "../services/clients/SearchClientServices";

class ClientController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listClientServices = new ListClientServices();

    const clients = await listClientServices.execute();

    return response.json(clients);
  }

  public async paginated(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { page } = request.query;

    const paginatedClientServices = new PaginatedClientServices();

    const clients = await paginatedClientServices.execute({
      page: page !== undefined ? parseInt(page.toString(), 10) : 0,
    });

    return response.status(200).json(clients);
  }

  public async search(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const searchClientServices = new SearchClientServices();

    const clients = await searchClientServices.execute(name?.toString() || "");

    return response.status(200).json(clients);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, telephone, bi } = request.body;

    const createClientServices = new CreateClientServices();

    const clients = await createClientServices.execute({
      name,
      email,
      telephone,
      bi,
    });

    return response.status(201).json(clients);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email, telephone, bi } = request.body;

    const updateClientServices = new UpdateClientServices();

    const clients = await updateClientServices.execute({
      id,
      name,
      email,
      telephone,
      bi,
    });

    return response.status(200).json(clients);
  }

  public async destroy(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const deleteClientServices = new DeleteClientServices();

    await deleteClientServices.execute(id);

    return response
      .status(200)
      .json({ message: "Client deleted successfully." });
  }
}

export { ClientController };
