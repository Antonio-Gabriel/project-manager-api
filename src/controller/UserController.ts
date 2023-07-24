import { Request, Response } from "express";
import { CreateUserServices } from "../services/users/CreateUserServices";
import { classToPlain } from "class-transformer";
import { EnableUserServices } from "../services/users/EnableUserServices";
import { UpdateUserServices } from "../services/users/UpdateUserServices";
import { ListUserServices } from "../services/users/ListUserServices";
import { DeleteUserService } from "../services/users/DeleteUserService";

class UserController {
  // criar usuários
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = new CreateUserServices();

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    return response.json(classToPlain(user));
  }

  // listar usuários
  public async index(request: Request, response: Response): Promise<Response> {
    const indexUser = new ListUserServices();

    const user = await indexUser.execute();

    if (!user) {
      return response.status(400).json("There is no registered user.");
    }

    return response.json(classToPlain(user));
  }

  // editar usuários
  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, email } = request.body;

    const updated = new UpdateUserServices();

    const user = await updated.execute({
      id,
      name,
      email,
    });

    delete user.password;

    return response.json(user);
  }

  // ativar usuários
  public async enable(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const enableUser = new EnableUserServices();

    const user = await enableUser.execute({ id });

    delete user.password;

    return response.json(user);
  }

  // eliminar usuários
  public async destroy(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const destroyUser = new DeleteUserService();

    await destroyUser.execute(id);

    return response.status(200).json({ message: "User deleted successfully." });
  }
}

export { UserController };
