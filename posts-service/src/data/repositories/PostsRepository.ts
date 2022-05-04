import { Repository } from "./Repository";
import { Post } from "../../domain/entities/Post";
import { PostProps } from "../../domain/entities/types";
import { PostMod } from "../schemas/PostSchema";

interface PostsRepositoryProps {
  PostModel: PostMod;
}

export class PostsRepository implements Repository<Post, PostProps> {
  private PostModel: PostMod;

  constructor({ PostModel }: PostsRepositoryProps) {
    this.PostModel = PostModel;
  }

  async create(props: PostProps): Promise<Post> {
    const post = this.PostModel.build(props);
    await post.save();

    return Post.build(post);
  }

  async getAll(filter?: Partial<PostProps>): Promise<Post[]> {
    const posts = await this.PostModel.find({ ...filter });
    return posts.map((post) => Post.build(post));
  }

  async getById(id: string): Promise<Post | null> {
    const postFound = await this.PostModel.findById(id);
    if (!postFound) return null;

    return Post.build(postFound);
  }

  async getOne(filter: Partial<PostProps>): Promise<Post | null> {
    const postFound = await this.PostModel.findOne(filter);
    if (!postFound) return null;

    return Post.build(postFound);
  }

  async delete(id: string): Promise<Post | null> {
    const postDeleted = await this.PostModel.findByIdAndDelete(id);
    if (!postDeleted) return null;

    return Post.build(postDeleted);
  }

  async update(id: string, props: Partial<PostProps>): Promise<Post | null> {
    const postUpdated = await this.PostModel.findByIdAndUpdate(id, props);
    if (!postUpdated) return null;

    return Post.build(postUpdated);
  }
}
