import { getCustomRepository } from "typeorm";
import { IProjectRepository } from "../../interface/IProjectRepository";
import { IClientsRepository } from "../../interface/IClientsRepository";
import { ProjectRepositories } from "../../repositories/ProjectRepositories";
import { ClientRepositories } from "../../repositories/ClientRepositories";
import * as yup from "yup";

interface IRequest {
  id: string;
  name: string;
  client_id: string;
  description: string;
  logo?: string;
  updated_at?: Date;
}

class UpdateProjectServices {
  private projectRepositories: IProjectRepository;
  private clientRepositories: IClientsRepository;

  constructor() {
    this.projectRepositories = getCustomRepository(ProjectRepositories);
    this.clientRepositories = getCustomRepository(ClientRepositories);
  }

  public async execute({
    id,
    name,
    client_id,
    description,
    logo,
    updated_at = new Date(Date.now()),
  }: IRequest) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      client_id: yup.string().required(),
      description: yup.string().required(),
    });

    if (!(await schema.isValid({ name, client_id, description }))) {
      throw new Error("Validations fails.");
    }

    const project = await this.projectRepositories.findById(id);

    if (!project) {
      throw new Error("Project not found.");
    }

    const client = await this.clientRepositories.findById(client_id);

    if (!client) {
      throw new Error("Client not found.");
    }

    let projects = Object.assign({
      ...project,
      ...{ name, client_id, description, logo, updated_at },
    });

    await this.projectRepositories.save(projects);

    return projects;
  }
}

export { UpdateProjectServices };
