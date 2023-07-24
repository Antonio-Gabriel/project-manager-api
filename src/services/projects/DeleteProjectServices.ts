import { getCustomRepository } from "typeorm";
import { IProjectRepository } from "../../interface/IProjectRepository";
import { ProjectRepositories } from "../../repositories/ProjectRepositories";

class DeleteProjectServices {
  private projectRepositories: IProjectRepository;

  constructor() {
    this.projectRepositories = getCustomRepository(ProjectRepositories);
  }

  public async execute(id: string) {
    const project = await this.projectRepositories.findById(id);

    if (!project) {
      throw new Error("Project not found.");
    }

    await this.projectRepositories.delete(id);
  }
}

export { DeleteProjectServices };
