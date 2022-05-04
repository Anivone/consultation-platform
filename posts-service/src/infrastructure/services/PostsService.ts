import { PostsRepository } from "../../data/repositories/PostsRepository";
import { Post } from "../../domain/entities/Post";
import {PostProps} from "../../domain/entities/types";
import {Service} from "./Service";

interface PostsServiceProps {
  postsRepository: PostsRepository;
}

export class PostsService implements Service<Post, PostProps>{
  private postsRepository: PostsRepository;

  constructor({ postsRepository }: PostsServiceProps) {
    this.postsRepository = postsRepository;
  }

  async get(filter?: Partial<PostProps>): Promise<Post[]> {
    const postsFound = await this.postsRepository.getAll(filter);

    return postsFound;
  }

  async getById(id: string): Promise<Post | null> {
    const postFound = await this.postsRepository.getById(id);
    console.log('postFound', postFound);
    if (!postFound) return null;

    return postFound;
  }

  async getOne(post: Partial<PostProps>): Promise<Post | null> {
    const postFound = await this.postsRepository.getOne(post);
    if (!postFound) return null;

    return postFound;
  }

  async create(post: Post): Promise<Post> {
    const newPost = Post.build(post);
    return await this.postsRepository.create(newPost);
  }

  async update(id: string, post: Partial<Post>): Promise<Post | null> {
    const postUpdated = await this.postsRepository.update(id, post);
    if (!postUpdated) return null;

    return Post.build(postUpdated);
  }

  async delete(id: string): Promise<Post | null> {
    const postDeleted = await this.postsRepository.delete(id);
    if (!postDeleted) return null;

    return postDeleted;
  }
}
