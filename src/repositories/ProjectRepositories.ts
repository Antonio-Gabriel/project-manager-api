import { EntityRepository, Repository, getRepository, Like } from "typeorm";
import { IProjectRepository } from "../interface/IProjectRepository";
import { ICreatProjectDto } from "../dtos/ProjectDTO";
import { Project } from "../models/Project";

@EntityRepository(Project)
class ProjectRepositories implements IProjectRepository {
  private ormRepositories: Repository<Project>;

  constructor() {
    this.ormRepositories = getRepository(Project);
  }

  public async findAll(): Promise<Project[]> {
    return this.ormRepositories.find({
      relations: ["client"],
    });
  }

  public async findAllOfUser(user_id: string): Promise<Project[]> {
    return this.ormRepositories.find({ relations: ["client"], where: user_id });
  }
  public async findAllPaginated(page: number): Promise<[Project[], number]> {
    return this.ormRepositories.findAndCount({
      skip: page,
      take: 10,
      relations: ["client"],
    });
  }

  public async findAllName(name: string): Promise<Project[]> {
    return this.ormRepositories.find({
      name: Like(`%${name}%`),
    });
  }

  public async findById(id: string): Promise<Project | undefined> {
    return this.ormRepositories.findOne(id, { relations: ["client"] });
  }

  public async create({
    name,
    user_id,
    client_id,
    status,
    logo,
    description,
  }: ICreatProjectDto): Promise<Project> {
    const project = this.ormRepositories.create({
      name,
      user_id,
      client_id,
      logo,
      status,
      description,
    });

    await this.ormRepositories.save(project);

    return project;
  }

  public async save(project: Project): Promise<Project> {
    return await this.ormRepositories.save(project);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepositories.delete(id);
  }
}

export { ProjectRepositories };
