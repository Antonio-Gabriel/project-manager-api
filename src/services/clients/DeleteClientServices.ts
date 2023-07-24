import { getCustomRepository } from 'typeorm';
import { IClientsRepository } from '../../interface/IClientsRepository';
import { ClientRepositories } from '../../repositories/ClientRepositories';


class DeleteClientServices{
  private clientRepositories : IClientsRepository;

  constructor(){
    this.clientRepositories = getCustomRepository(ClientRepositories);
  }

  public async execute(id: string): Promise<void>{
    const client = await this.clientRepositories.findById(id);

    if(!client){
      throw new Error("Client not found.");
    }

    await this.clientRepositories.delete(id);
  }
}

export { DeleteClientServices }