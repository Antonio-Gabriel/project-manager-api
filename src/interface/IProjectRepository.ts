import { Project } from "../models/Project";
import { ICreatProjectDto } from "../dtos/ProjectDTO";

export interface IProjectRepository {
  findAll(): Promise<Project[]>;
  findAllOfUser(user_id: string): Promise<Project[]>;
  findAllPaginated(page: number): Promise<[Project[], number]>;
  findAllName(name: string): Promise<Project[]>;
  findById(id: string): Promise<Project | undefined>;
  create(creatProjectDto: ICreatProjectDto): Promise<Project>;
  save(project: Project): Promise<Project>;
  delete(id: string): Promise<void>;
}
