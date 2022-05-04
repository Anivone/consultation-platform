import UserModel, { UserMod } from "../data/schemas/UserSchema";
import { AuthRepository } from "../data/repositories/AuthRepository";
import { AuthService } from "../infrastructure/services/AuthService";
import {asClass, asValue, AwilixContainer, createContainer} from "awilix";

declare global {
  namespace Express {
    interface Request {
      container: AwilixContainer<MyContainer>;
    }
  }
}

interface MyContainer {
  UserModel: UserMod;
  authRepository: AuthRepository;
  authService: AuthService;
}

export default function initContainer() {
  const container = createContainer<MyContainer>();

  container.register({
    UserModel: asValue(UserModel),

    // Repositories

    authRepository: asClass(AuthRepository).singleton(),

    // Services

    authService: asClass(AuthService).singleton(),
  });

  return container;
}
