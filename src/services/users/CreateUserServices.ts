import { getCustomRepository } from "typeorm";
import { hash } from "bcryptjs";
import { UserRepositories } from "../../repositories/UserRepositories";
import { IUserRepository } from "../../interface/IUserRepository";
import { User } from "../../models/User";
import * as Yup from "yup";

interface ICreatedUser {
  name: string;
  email: string;
  password: string;
  active?: boolean;
}

class CreateUserServices {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepositories);
  }

  public async execute({
    name,
    email,
    password,
    active = false,
  }: ICreatedUser): Promise<User> {
    const passwordHash = await hash(password, 8);

    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
      password: Yup.string().required().min(6),
    });

    if (!(await schema.isValid({ name, email, password }))) {
      throw new Error("Validation fails");
    }

    const userAlreadyExists = await this.userRepository.findEmail(email);

    if (userAlreadyExists) {
      throw new Error("User already exists!");
    }

    const user = await this.userRepository.create({
      name,
      email,
      password: passwordHash,
      active,
    });

    return user;
  }
}

export { CreateUserServices };
