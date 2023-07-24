import { EntityRepository, Repository, getRepository } from "typeorm";
import { CreateUserDTO } from "../dtos/UserDTO";
import { IUserRepository } from "../interface/IUserRepository";
import { User } from "../models/User";

@EntityRepository(User)
class UserRepositories implements IUserRepository {
  private ormRepositories: Repository<User>;

  constructor() {
    this.ormRepositories = getRepository(User);
  }
  // show all user
  public async findAll(): Promise<User[]> {
    return this.ormRepositories.find();
  }
  // search id
  public async findById(id: string): Promise<User | undefined> {
    return this.ormRepositories.findOne({ id });
  }
  // search email
  public async findEmail(email: string): Promise<User | undefined> {
    return this.ormRepositories.findOne({ email });
  }
  // create user
  public async create({ name, email, password }: CreateUserDTO): Promise<User> {
    const user = this.ormRepositories.create({
      name,
      email,
      password,
    });

    await this.ormRepositories.save(user);

    return user;
  }
  // Save / Update
  public async save(user: User): Promise<User> {
    return this.ormRepositories.save(user);
  }
  // delete
  public async delete(id: string): Promise<void> {
    this.ormRepositories.delete(id);
  }
}

export { UserRepositories };
