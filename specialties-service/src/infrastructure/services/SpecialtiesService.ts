import { SpecialtiesRepository } from "../../data/repositories/SpecialtiesRepository";
import { Specialty } from "../../domain/entities/Specialty";
import {SpecialtyProps} from "../../domain/entities/types";
import {Service} from "./Service";

interface PostsServiceProps {
  postsRepository: SpecialtiesRepository;
}

export class PostsService implements Service<Specialty, SpecialtyProps>{
  private postsRepository: SpecialtiesRepository;

  constructor({ postsRepository }: PostsServiceProps) {
    this.postsRepository = postsRepository;
  }

  async get(filter?: Partial<SpecialtyProps>): Promise<Specialty[]> {
    const postsFound = await this.postsRepository.getAll(filter);

    return postsFound;
  }

  async getById(id: string): Promise<Specialty | null> {
    const postFound = await this.postsRepository.getById(id);
    console.log('postFound', postFound);
    if (!postFound) return null;

    return postFound;
  }

  async getOne(post: Partial<SpecialtyProps>): Promise<Specialty | null> {
    const postFound = await this.postsRepository.getOne(post);
    if (!postFound) return null;

    return postFound;
  }

  async create(post: Specialty): Promise<Specialty> {
    const newPost = Specialty.build(post);
    return await this.postsRepository.create(newPost);
  }

  async update(id: string, post: Partial<Specialty>): Promise<Specialty | null> {
    const postUpdated = await this.postsRepository.update(id, post);
    if (!postUpdated) return null;

    return Specialty.build(postUpdated);
  }

  async delete(id: string): Promise<Specialty | null> {
    const postDeleted = await this.postsRepository.delete(id);
    if (!postDeleted) return null;

    return postDeleted;
  }
}
