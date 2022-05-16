import { Request } from "express";
import PostModel, { PostMod } from "../data/schemas/PostSchema";
import { PostsRepository } from "../data/repositories/PostsRepository";
import { asClass, asValue, AwilixContainer, createContainer } from "awilix";
import { PostsService } from "../infrastructure/services/PostsService";
import { UserDTO } from "../infrastructure/dtos/UserDTO";

export interface MyRequest extends Request {
  currentUser: UserDTO | null;
  container: AwilixContainer<MyContainer>;
}

interface MyContainer {
  PostModel: PostMod;
  postsRepository: PostsRepository;
  postsService: PostsService;
}

export default function initContainer() {
  const container = createContainer<MyContainer>();

  container.register({
    PostModel: asValue(PostModel),

    // Repositories

    postsRepository: asClass(PostsRepository).singleton(),

    // Services

    postsService: asClass(PostsService).singleton(),
  });

  return container;
}
