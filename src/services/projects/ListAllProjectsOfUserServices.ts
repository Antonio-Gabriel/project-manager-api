import { getCustomRepository } from "typeorm";
import { ProjectRepositories } from "../../repositories/ProjectRepositories";
import { IProjectRepository } from "../../interface/IProjectRepository";
import { Project } from "../../models/Project";

class ListAllProjectsOfUserServices {
  private projectRepositories: IProjectRepository;

  constructor() {
    this.projectRepositories = getCustomRepository(ProjectRepositories);
  }

  public async execute(user_id: string): Promise<Project[]> {
    return await this.projectRepositories.findAllOfUser(user_id);
  }
}

export { ListAllProjectsOfUserServices };
