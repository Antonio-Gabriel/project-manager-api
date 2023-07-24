import { getCustomRepository } from "typeorm";
import { IProjectRepository } from "../../interface/IProjectRepository";
import { ProjectRepositories } from "../../repositories/ProjectRepositories";
import ProjectStatus from '../../status/ProjectStatus'

interface IRequest{
  id: string;
  status: ProjectStatus; 
}

class UpdateProjectStatusServices {
  private projectRepositories : IProjectRepository;

  constructor(){
    this.projectRepositories = getCustomRepository(ProjectRepositories);
  }

  async execute({ id, status }: IRequest){
    const project = this.projectRepositories.findById(id);

    if(!project){
      throw new Error("Project not found.")
    }

    let projects = Object.assign({
      ...project, ...{status}
    });

    await this.projectRepositories.save(projects);

    return projects;

  }

}

export { UpdateProjectStatusServices };
