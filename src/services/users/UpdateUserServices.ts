import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../../repositories/UserRepositories";
import { IUserRepository } from "../../interface/IUserRepository";
import { User } from "../../models/User";
import * as Yup from "yup";

interface IUpdatedUser {
  id: string;
  name: string;
  email: string;
}

class UpdateUserServices {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepositories);
  }

  public async execute({ id, name, email }: IUpdatedUser): Promise<User> {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string().email().required(),
    });

    if (!(await schema.isValid({ name, email }))) {
      throw new Error("Validation fails");
    }

    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    if (email !== user.email) {
      const userAlreadyExists = await this.userRepository.findEmail(email);

      if (userAlreadyExists) {
        throw new Error("User already exists.");
      }
    }

    user.name = name;
    user.email = email;

    await this.userRepository.save(user);

    return user;
  }
}

export { UpdateUserServices };
