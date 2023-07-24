import { getCustomRepository } from "typeorm";
import { IClientsRepository } from "../../interface/IClientsRepository";
import { IPaginated } from "../../interface/IPaginated";
import { ClientRepositories } from "../../repositories/ClientRepositories";
import { Client } from "../../models/Client";

interface IRequest {
  page: number;
}

class PaginatedClientServices {
  private clientRepositories: IClientsRepository;

  constructor() {
    this.clientRepositories = getCustomRepository(ClientRepositories);
  }

  public async execute({ page }: IRequest): Promise<IPaginated<Client>> {
    const [clients, total] = await this.clientRepositories.findAllPaginated(
      page * 10
    );

    const totalPages = Math.ceil(total / 10);

    const response: IPaginated<Client> = {
      data: clients,
      totalElements: total,
      page,
      elements: clients.length,
      elementsPerPage: 10,
      totalPages,
      firstPage: page === 0,
      lastPage: page === totalPages - 1,
    };

    return response;
  }
}

export { PaginatedClientServices };
