import { getCustomRepository } from "typeorm";
import { IClientsRepository } from "../../interface/IClientsRepository";
import { ClientRepositories } from "../../repositories/ClientRepositories";
import { Client } from "../../models/Client";

class SearchClientServices {
  private clientRepositories: IClientsRepository;

  constructor() {
    this.clientRepositories = getCustomRepository(ClientRepositories);
  }

  public async execute(name: string): Promise<Client[]> {
    return await this.clientRepositories.findAllByName(name);
  }
}

export { SearchClientServices };
