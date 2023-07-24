import { getCustomRepository } from "typeorm";
import { IUserRepository } from "../../interface/IUserRepository";
import { UserRepositories } from "../../repositories/UserRepositories";
import { User } from "../../models/User";

interface IEnableUserServices {
  id: string;
}

class EnableUserServices {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepositories);
  }

  public async execute({ id }: IEnableUserServices): Promise<User> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new Error(" User already exists");
    }

    user.active = !user.active;

    await this.userRepository.save(user);

    return user;
  }
}

export { EnableUserServices };
