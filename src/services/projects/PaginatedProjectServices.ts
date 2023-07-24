import { getCustomRepository } from "typeorm";
import { IProjectRepository } from "../../interface/IProjectRepository";
import { ProjectRepositories } from "../../repositories/ProjectRepositories";
import { Project } from "../../models/Project";
import { IPaginated } from "../../interface/IPaginated";

interface IRequest {
  page: number;
}

class PaginatedProjectServices {
  private projectRepositories: IProjectRepository;

  constructor() {
    this.projectRepositories = getCustomRepository(ProjectRepositories);
  }

  public async execute({ page }: IRequest): Promise<IPaginated<Project>> {
    const [projects, total] = await this.projectRepositories.findAllPaginated(
      page * 10
    );

    const totalPages = Math.ceil(total / 10);

    const response: IPaginated<Project> = {
      data: projects,
      totalElements: total,
      page,
      elements: projects.length,
      elementsPerPage: 10,
      totalPages,
      firstPage: page === 0,
      lastPage: page === totalPages - 1,
    };

    return response;
  }
}

export { PaginatedProjectServices };
