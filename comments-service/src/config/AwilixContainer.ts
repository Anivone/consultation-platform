import { Request } from "express";
import { createContainer, asValue, asClass, AwilixContainer } from "awilix";
import CommentModel, { CommentMod } from "../data/schemas/CommentSchema";
import { CommentsRepository } from "../data/repositories/CommentsRepository";
import { CommentsService } from "../infrastructure/services/CommentsService";

require("express-async-errors");

export interface MyRequest extends Request {
  container: AwilixContainer<MyContainer>;
}

interface MyContainer {
  CommentModel: CommentMod;
  commentsRepository: CommentsRepository;
  commentsService: CommentsService;
}

export default function initContainer() {
  const container = createContainer<MyContainer>();

  container.register({
    CommentModel: asValue(CommentModel),

    // Repositories

    commentsRepository: asClass(CommentsRepository).singleton(),

    // Services

    commentsService: asClass(CommentsService).singleton(),
  });

  return container;
}
