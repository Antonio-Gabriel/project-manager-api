import { User } from "../models/User";
import { CreateUserDTO } from "../dtos/UserDTO";

export interface IUserRepository {
  findAll(): Promise<User[]>;
  findById(id: string): Promise<User | undefined>;
  findEmail(email: string): Promise<User | undefined>;
  create(createUserDTO: CreateUserDTO): Promise<User>;
  save(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
