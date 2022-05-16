import { natsWrapper } from "@mv-consultation-platform/common";

import { PostsRepository } from "../../data/repositories/PostsRepository";
import { Post } from "../../domain/entities/Post";
import { PostProps } from "../../domain/entities/types";
import { Service } from "./Service";
import { PostCreatedPublisher } from "../../events/PostCreated.publisher";
import { PostUpdatedPublisher } from "../../events/PostUpdated.publisher";
import { PostDetailedCreatedPublisher } from "../../events/PostDetailedCreated.publisher";
import { PostDetailedUpdatedPublisher } from "../../events/PostDetailedUpdated.publisher";
import { UserDTO } from "../dtos/UserDTO";
import { PostViewedPublisher } from "../../events/PostViewed.publisher";

interface PostsServiceProps {
  postsRepository: PostsRepository;
}

export class PostsService implements Service<Post, PostProps> {
  private postsRepository: PostsRepository;

  constructor({ postsRepository }: PostsServiceProps) {
    this.postsRepository = postsRepository;
  }

  async get(filter?: Partial<PostProps>): Promise<Post[]> {
    const postsFound = await this.postsRepository.getAll(filter);

    return postsFound;
  }

  async getById(id: string, currentUser: UserDTO | null): Promise<Post | null> {
    const postFound = await this.postsRepository.getById(id);
    if (!postFound) return null;

    if (currentUser) {
      await new PostViewedPublisher(natsWrapper.client).publish({
        userId: currentUser.id!,
        postId: postFound.id!,
      });
    }

    return postFound;
  }

  async getOne(post: Partial<PostProps>): Promise<Post | null> {
    const postFound = await this.postsRepository.getOne(post);
    if (!postFound) return null;

    return postFound;
  }

  async create(post: Post): Promise<Post> {
    const newPost = Post.build(post);
    const postCreated = await this.postsRepository.create(newPost);

    await new PostCreatedPublisher(natsWrapper.client).publish({
      id: postCreated.id!,
      version: postCreated.version,
      title: postCreated.title,
      userId: postCreated.userId,
      date: postCreated.date,
      sphereId: postCreated.sphereId,
      specialty: postCreated.specialty,
      status: postCreated.status!,
    });

    await new PostDetailedCreatedPublisher(natsWrapper.client).publish({
      ...postCreated,
      id: postCreated.id!,
    });

    return postCreated;
  }

  async update(id: string, post: Partial<Post>): Promise<Post | null> {
    const postUpdated = await this.postsRepository.update(id, post);
    if (!postUpdated) return null;

    await new PostUpdatedPublisher(natsWrapper.client).publish({
      id: postUpdated.id!,
      version: postUpdated.version,
      title: postUpdated.title,
      userId: postUpdated.userId,
      date: postUpdated.date,
      sphereId: postUpdated.sphereId,
      specialty: postUpdated.specialty,
      status: postUpdated.status!,
    });

    await new PostDetailedUpdatedPublisher(natsWrapper.client).publish({
      ...postUpdated,
      id: postUpdated.id!,
    });

    return Post.build(postUpdated);
  }

  async delete(id: string): Promise<Post | null> {
    const postDeleted = await this.postsRepository.delete(id);
    if (!postDeleted) return null;

    return postDeleted;
  }
}
