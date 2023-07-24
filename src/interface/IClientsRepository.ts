import { Client } from "../models/Client";
import { ICreateClientDTO } from "../dtos/ClientDTO";

export interface IClientsRepository {
  findAll(): Promise<Client[]>;
  findAllPaginated(page: number): Promise<[Client[], number]>;
  findById(id: string): Promise<Client | undefined>;
  findAllByName(name: string): Promise<Client[]>;
  findEmail(email: string): Promise<Client | undefined>;
  create(createClientDTO: ICreateClientDTO): Promise<Client>;
  save(client: Client): Promise<Client>;
  delete(id: string): Promise<void>;
}
