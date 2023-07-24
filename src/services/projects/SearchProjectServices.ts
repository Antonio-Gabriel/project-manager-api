import { getCustomRepository } from "typeorm";
import { IProjectRepository } from "../../interface/IProjectRepository";
import { ProjectRepositories } from "../../repositories/ProjectRepositories";

class SearchProjectServices {
  private projectRepositories: IProjectRepository;

  constructor() {
    this.projectRepositories = getCustomRepository(ProjectRepositories);
  }

  public async execute(name: string) {
    return this.projectRepositories.findAllName(name);
  }
}

export { SearchProjectServices };
