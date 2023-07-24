import { getCustomRepository } from "typeorm";
import { ClientRepositories } from "../../repositories/ClientRepositories";
import { IClientsRepository } from "../../interface/IClientsRepository";

class ListClientServices {
  private clientsRepository: IClientsRepository;

  constructor() {
    this.clientsRepository = getCustomRepository(ClientRepositories);
  }

  public async execute(){
    return this.clientsRepository.findAll();
  }
}

export { ListClientServices };
