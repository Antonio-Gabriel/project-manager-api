import { getCustomRepository } from "typeorm";
import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { UserRepositories } from "../../repositories/UserRepositories";
import { IUserRepository } from "../../interface/IUserRepository";
//import { AppError } from '../../errors'

interface IAuthenticateUserService {
  email: string;
  password: string;
}

class AuthenticateUserService {
  private userRepository: IUserRepository;

  constructor() {
    this.userRepository = getCustomRepository(UserRepositories);
  }

  public async execute({ email, password }: IAuthenticateUserService) {
    const user = await this.userRepository.findEmail(email);

    if (!user) {
      // App error.
      //throw new AppError("Email or password incorrect.", 400);
      throw new Error("Email or password incorrect.");
    }

    const passwordMatch = await compare(password, user.password);

    if (!passwordMatch) {
      throw new Error("Email or password incorrect.");
    }

    const token = sign(
      { email: user.email },
      process.env.APP_SECRET as string,
      {
        subject: user.id,
        expiresIn: "1d",
      }
    );

    delete user.password;

    return { token, user };
  }
}

export { AuthenticateUserService };
