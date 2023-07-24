import { getCustomRepository, Timestamp } from "typeorm";
import { IClientsRepository } from "../../interface/IClientsRepository";
import { ClientRepositories } from "../../repositories/ClientRepositories";
import * as yup from "yup";

interface IRequest {
  id: string;
  name: string;
  email: string;
  telephone: string;
  bi: string;
  updated_at?: Date;
}

class UpdateClientServices {
  private clientRepositories: IClientsRepository;

  constructor() {
    this.clientRepositories = getCustomRepository(ClientRepositories);
  }

  public async execute({
    id,
    name,
    email,
    telephone,
    bi,
    updated_at = new Date(Date.now()),
  }: IRequest) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      telephone: yup.string().required(),
      bi: yup.string().required(),
    });

    if (!(await schema.isValid({ name, email, telephone, bi }))) {
      throw new Error("Validations fails.");
    }

    const client = await this.clientRepositories.findById(id);

    if (!client) {
      throw new Error("Client not found.");
    }

    if (email !== client.email) {
      const clientAlreadyExists = await this.clientRepositories.findEmail(
        email
      );

      if (clientAlreadyExists) {
        throw new Error("Client already exists.");
      }
    }

    let clients = Object.assign({
      ...client,
      ...{ name, email, telephone, bi, updated_at },
    });

    await this.clientRepositories.save(clients);

    return clients;
  }
}

export { UpdateClientServices };
