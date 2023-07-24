import { getCustomRepository } from 'typeorm';
import { IProjectRepository } from '../../interface/IProjectRepository';
import { ProjectRepositories } from '../../repositories/ProjectRepositories';

class ShowProjectServices{
  private projectRepositories : IProjectRepository;

  constructor(){
    this.projectRepositories = getCustomRepository(ProjectRepositories);
  }

  async execute(id: string){
    const projects = await this.projectRepositories.findById(id);

    if(!projects){
      throw new Error("Project not found.");
    }

    return projects;
  }
}

export { ShowProjectServices }