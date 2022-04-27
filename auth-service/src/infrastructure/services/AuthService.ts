import jwt from "jsonwebtoken";

import { AuthRepository } from "../../data/repositories/AuthRepository";
import { UserProps } from "../../domain/entities/types";
import { CustomBadRequestError } from "../errors/CustomBadRequestError";
import { User } from "../../domain/entities/User";
import { Password } from "../utils/Password";
import { UserDTO } from "../dtos/UserDTO";

interface AuthSrvProps {
  authRepository: AuthRepository;
}

export class AuthService {
  private authRepository: AuthRepository;

  constructor({ authRepository }: AuthSrvProps) {
    this.authRepository = authRepository;
  }

  async login(email: string, password: string): Promise<[User, string]> {
    const existingUser = await this.authRepository.getOne({
      email,
    });
    if (!existingUser) {
      throw new CustomBadRequestError("User with such email does not exist");
    }

    const passwordsMatch = Password.compare(existingUser.password, password);
    if (!passwordsMatch) {
      throw new CustomBadRequestError("Passwords do not match");
    }

    const jwtToken = this.generateJwtToken(existingUser);

    return [existingUser, jwtToken];
  }

  async signup(user: UserProps): Promise<[User, string]> {
    const existingUser = await this.authRepository.getOne({
      email: user.email,
    });

    if (existingUser) {
      throw new CustomBadRequestError("User with such email already exists");
    }

    const newUser = await this.authRepository.create(user);
    const jwtToken = this.generateJwtToken(newUser);

    return [newUser, jwtToken];
  }

  private generateJwtToken(user: User) {
    const payload: UserDTO = {
      id: user.id,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      isConsultant: user.isConsultant,
    };
    const jwtToken = jwt.sign(payload, process.env.JWT_KEY!);

    return jwtToken;
  }
}
