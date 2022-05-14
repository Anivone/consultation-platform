import { Repository } from "./Repository";
import { Specialty } from "../../domain/entities/Specialty";
import { SpecialtyProps } from "../../domain/entities/types";
import { PostMod } from "../schemas/SpecialtySchema";

interface PostsRepositoryProps {
  PostModel: PostMod;
}

export class PostsRepository implements Repository<Specialty, SpecialtyProps> {
  private PostModel: PostMod;

  constructor({ PostModel }: PostsRepositoryProps) {
    this.PostModel = PostModel;
  }

  async create(props: SpecialtyProps): Promise<Specialty> {
    const post = this.PostModel.build(props);
    await post.save();

    return Specialty.build(post);
  }

  async getAll(filter?: Partial<SpecialtyProps>): Promise<Specialty[]> {
    const posts = await this.PostModel.find({ ...filter });
    return posts.map((post) => Specialty.build(post));
  }

  async getById(id: string): Promise<Specialty | null> {
    const postFound = await this.PostModel.findById(id);
    if (!postFound) return null;

    return Specialty.build(postFound);
  }

  async getOne(filter: Partial<SpecialtyProps>): Promise<Specialty | null> {
    const postFound = await this.PostModel.findOne(filter);
    if (!postFound) return null;

    return Specialty.build(postFound);
  }

  async delete(id: string): Promise<Specialty | null> {
    const postDeleted = await this.PostModel.findByIdAndDelete(id);
    if (!postDeleted) return null;

    return Specialty.build(postDeleted);
  }

  async update(id: string, props: Partial<SpecialtyProps>): Promise<Specialty | null> {
    const postUpdated = await this.PostModel.findByIdAndUpdate(id, props);
    if (!postUpdated) return null;

    return Specialty.build(postUpdated);
  }
}
