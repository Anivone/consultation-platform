import * as awilix from "awilix";

import UserModel, { UserMod } from "../data/schemas/UserSchema";
import { AuthRepository } from "../data/repositories/AuthRepository";
import { AuthService } from "../infrastructure/services/AuthService";

declare global {
  namespace Express {
    interface Request {
      container: awilix.AwilixContainer<MyContainer>;
    }
  }
}

interface MyContainer {
  UserModel: UserMod;
  authRepository: AuthRepository;
  authService: AuthService;
}

export default function initContainer() {
  const container = awilix.createContainer<MyContainer>();

  container.register({
    UserModel: awilix.asValue(UserModel),

    // Repositories

    authRepository: awilix.asClass(AuthRepository).singleton(),

    // Services

    authService: awilix.asClass(AuthService).singleton(),
  });

  return container;
}
