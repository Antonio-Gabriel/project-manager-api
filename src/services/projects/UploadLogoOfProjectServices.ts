import { getCustomRepository } from 'typeorm';
import { IProjectRepository } from '../../interface/IProjectRepository';
import { ProjectRepositories } from '../../repositories/ProjectRepositories'
import { AppError } from '../../errors'

interface IRequest{
  id: string;
  logo: string;
}

class UploadLogoOfProjectServices{
  private projectRepositories: IProjectRepository;

  constructor(){
    this.projectRepositories = getCustomRepository(ProjectRepositories)
  }

  async execute({ id, logo }: IRequest){
    const project = await this.projectRepositories.findById(id);

    if(!project){
      throw new AppError("Project not found", 400);      
    }

    let projects = Object.assign({
      ...project, ...{ logo }
    });

    await this.projectRepositories.save(projects);

    return projects;

  }
}

export { UploadLogoOfProjectServices }