import { getCustomRepository } from "typeorm";
import { IProjectRepository } from "../../interface/IProjectRepository";
import { ProjectRepositories } from "../../repositories/ProjectRepositories";

class ListAllProjectServices {
  private projectRepositories: IProjectRepository;

  constructor() {
    this.projectRepositories = getCustomRepository(ProjectRepositories);
  }

  async execute() {
    return await this.projectRepositories.findAll();
  }
  
}

export { ListAllProjectServices };
