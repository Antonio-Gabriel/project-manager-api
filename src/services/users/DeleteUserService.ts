import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../../repositories/UserRepositories";
import { IUserRepository } from "../../interface/IUserRepository";

class DeleteUserService {
  private userRepositories: IUserRepository;

  constructor() {
    this.userRepositories = getCustomRepository(UserRepositories);
  }

  public async execute(id: string): Promise<void> {
    const user = await this.userRepositories.findById(id);

    if (!user) {
      throw new Error("User not found.");
    }

    await this.userRepositories.delete(id);
  }
}

export { DeleteUserService };
