import { Request, Response } from "express";
import { CreateProjectServices } from "../services/projects/CreateProjectServices";
import { DeleteProjectServices } from "../services/projects/DeleteProjectServices";
import { ListAllProjectsOfUserServices } from "../services/projects/ListAllProjectsOfUserServices";
import { ShowProjectServices } from "../services/projects/ShowProjectServices";
import { PaginatedProjectServices } from "../services/projects/PaginatedProjectServices";
import { SearchProjectServices } from "../services/projects/SearchProjectServices";
import { UpdateProjectServices } from "../services/projects/UpdateProjectServices";
import { UploadLogoOfProjectServices } from "../services/projects/UploadLogoOfProjectServices";
import { ListAllProjectServices } from '../services/projects/ListAllProjectServices'
import { UpdateProjectStatusServices } from '../services/projects/UpdateProjectStatusServices'

class ProjectController {
  public async index(request: Request, response: Response): Promise<Response> {
    const index = new ListAllProjectServices();

    const projects = await index.execute();

    return response.status(200).json(projects);
  }

  public async showProjectsUsers(request: Request, response: Response): Promise<Response> {
    const { user_id } = request.params;

    const index = new ListAllProjectsOfUserServices();

    const projects = await index.execute(user_id);

    return response.status(200).json(projects);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const index = new ShowProjectServices();

    const projects = await index.execute(id);

    return response.status(200).json(projects);
  }


  public async search(request: Request, response: Response): Promise<Response> {
    const { name } = request.query;

    const search = new SearchProjectServices();

    const projects = await search.execute(name?.toString() || "");

    return response.status(200).json(projects);
  }

  public async paginated(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { page } = request.query;

    const paginatedProjectServices = new PaginatedProjectServices();

    const projects = await paginatedProjectServices.execute({
      page: page !== undefined ? parseInt(page.toString(), 10) : 0,
    });

    return response.status(200).json(projects);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, client_id, description, user_id } = request.body;

    const create = new CreateProjectServices();

    const projects = await create.execute({
      name,
      client_id,
      user_id,
      logo: request.file?.filename,
      description,
    });

    return response.status(200).json(projects);
  }

  public async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { name, client_id, logo, description } = request.body;

    const update = new UpdateProjectServices();

    const projects = await update.execute({
      id,
      name,
      client_id,
      logo,
      description,
    });

    return response.status(200).json(projects);
  }

  public async uploadImage(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { filename } = request.file;

    const uploads = new UploadLogoOfProjectServices();

    const projects = await uploads.execute({
      id,
      logo : filename
    });

    return response.json(projects);
  }

  public async destroy(
    request: Request,
    response: Response
  ): Promise<Response> {
    const { id } = request.params;

    const deleted = new DeleteProjectServices();

    await deleted.execute(id);

    return response
      .status(200)
      .json({ message: "Project deleted successfully." });
  }

  public async changeStatus(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { status } = request.body;

    const updateProjects = new UpdateProjectStatusServices();

    const projects = await updateProjects.execute({
      id,
      status
    });

    return response.json(projects);
  }
}

export { ProjectController };
