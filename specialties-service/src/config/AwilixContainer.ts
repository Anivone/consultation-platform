import { Request } from "express";
import PostModel, {PostMod} from "../data/schemas/PostSchema";
import {PostsRepository} from "../data/repositories/PostsRepository";
import {createContainer, asValue, asClass, AwilixContainer} from "awilix";
import {PostsService} from "../infrastructure/services/PostsService";

export interface MyRequest extends Request {
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
