import { Request } from "express";
import {asClass, AwilixContainer, createContainer} from "awilix";
import { UserDTO } from "../infrastructure/dtos/UserDTO";
import {RecommendationsService} from "../infrastructure/services/RecommendationsService";

export interface MyRequest extends Request {
  currentUser: UserDTO | null;
  container: AwilixContainer<MyContainer>;
}

interface MyContainer {
  recommendationsService: RecommendationsService;
}

export default function initContainer() {
  const container = createContainer<MyContainer>();

  container.register({
    // Repositories
    // Services
    recommendationsService: asClass(RecommendationsService).singleton(),
  });

  return container;
}
