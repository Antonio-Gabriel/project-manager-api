import { EntityRepository, Repository, getRepository, Like } from "typeorm";
import { IClientsRepository } from "../interface/IClientsRepository";
import { ICreateClientDTO } from "../dtos/ClientDTO";
import { Client } from "../models/Client";

@EntityRepository(Client)
class ClientRepositories implements IClientsRepository {
  private ormRepositories: Repository<Client>;

  constructor() {
    this.ormRepositories = getRepository(Client);
  }

  public async findAll(): Promise<Client[]> {
    return this.ormRepositories.find();
  }

  public async findAllPaginated(page: number): Promise<[Client[], number]> {
    return this.ormRepositories.findAndCount({
      skip: page,
      take: 10,
    });
  }

  public async findAllByName(name: string): Promise<Client[]> {
    return this.ormRepositories.find({
      name: Like(`%${name}%`),
    });
  }

  public async findById(id: string): Promise<Client | undefined> {
    return this.ormRepositories.findOne({ id });
  }

  public async findEmail(email: string): Promise<Client> {
    return this.ormRepositories.findOne({ email });
  }

  public async create({
    name,
    email,
    bi,
    telephone,
  }: ICreateClientDTO): Promise<Client> {
    const client = this.ormRepositories.create({
      name,
      email,
      bi,
      telephone,
    });

    await this.ormRepositories.save(client);

    return client;
  }

  public async save(client: Client): Promise<Client> {
    return await this.ormRepositories.save(client);
  }

  public async delete(id: string): Promise<void> {
    this.ormRepositories.delete(id);
  }
}

export { ClientRepositories };
