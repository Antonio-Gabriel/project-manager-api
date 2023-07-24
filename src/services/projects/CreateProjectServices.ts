import { getCustomRepository } from "typeorm";
import { IProjectRepository } from "../../interface/IProjectRepository";
import { IClientsRepository } from "../../interface/IClientsRepository";
//import { IUserRepository } from "../../interface/IUserRepository";
import { ProjectRepositories } from "../../repositories/ProjectRepositories";
import { ClientRepositories } from "../../repositories/ClientRepositories";
//import { UserRepositories } from "../../repositories/UserRepositories";
import * as yup from "yup";
import ProjectStatus from "../../status/ProjectStatus";

interface IRequest {
  name: string;
  user_id: string;
  client_id: string;
  logo?: string;
  description: string;
}

class CreateProjectServices {
  private projectRepositories: IProjectRepository;
  private clientRepositories: IClientsRepository;
 // private userRepositories: IUserRepository;

  constructor() {
    this.projectRepositories = getCustomRepository(ProjectRepositories);
    this.clientRepositories = getCustomRepository(ClientRepositories);
    //this.userRepositories = getCustomRepository(UserRepositories);
  }

  public async execute({
    name,
    client_id,
    logo,
    description,
    user_id,
  }: IRequest) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      client_id: yup.string().required(),
      description: yup.string().required(),
    });

    if (!(await schema.isValid({ name, client_id, description, user_id }))) {
      throw new Error("Validations fails.");
    }

    // const users = await this.userRepositories.findById(user_id);

    // if (!users) {
    //   throw new Error("User does not exists!");
    // }

    const clients = await this.clientRepositories.findById(client_id);

    if (!clients) {
      throw new Error("Client does not exists!");
    }

    const project = await this.projectRepositories.create({
      name,
      user_id,
      client_id,
      logo,
      description,
      status: ProjectStatus.NEW,
    });

    await this.projectRepositories.save(project);

    return project;
  }
}

export { CreateProjectServices };
