import { getCustomRepository } from "typeorm";
import { IClientsRepository } from "../../interface/IClientsRepository";
import { ClientRepositories } from "../../repositories/ClientRepositories";
import * as yup from "yup";

interface IRequest {
  name: string;
  email: string;
  telephone: string;
  bi: string;
}

class CreateClientServices {
  private clientRepository: IClientsRepository
  
  constructor() {
    this.clientRepository = getCustomRepository(ClientRepositories);
  }

  public async execute({ name, email, telephone, bi }: IRequest) {
    const schema = yup.object().shape({
      name: yup.string().required(),
      email: yup.string().email().required(),
      telephone: yup.string().required(),
      bi: yup.string().required(),
    });

    if (!(await schema.isValid({ name, email, telephone, bi }))) {
      throw new Error("Validations fails.");
    }

    const userAlreadyExists = await this.clientRepository.findEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists.");
    }

    const client = await this.clientRepository.create({
      name,
      email,
      telephone,
      bi,
    });

    return client;
  }
}

export { CreateClientServices };
