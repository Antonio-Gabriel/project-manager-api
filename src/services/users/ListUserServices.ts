import { getCustomRepository } from "typeorm";
import { UserRepositories } from "../../repositories/UserRepositories";
import { IUserRepository } from "../../interface/IUserRepository";

class ListUserServices {
  private userRepositories: IUserRepository;

  constructor() {
    this.userRepositories = getCustomRepository(UserRepositories);
  }

  public async execute() {
    return await this.userRepositories.findAll();
  }
}

export { ListUserServices };
