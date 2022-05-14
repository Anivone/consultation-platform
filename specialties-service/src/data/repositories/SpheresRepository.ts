import { Repository } from "./Repository";
import { Specialty } from "../../domain/entities/Specialty";
import { SpecialtyProps } from "../../domain/entities/types";
import { SpecialtyMod } from "../schemas/SpecialtySchema";

interface SpecialtiesRepositoryProps {
  SpecialtyModel: SpecialtyMod;
}

export class SpecialtiesRepository implements Repository<Specialty, SpecialtyProps> {
  private SpecialtyModel: SpecialtyMod;

  constructor({ SpecialtyModel }: SpecialtiesRepositoryProps) {
    this.SpecialtyModel = SpecialtyModel;
  }

  async create(props: SpecialtyProps): Promise<Specialty> {
    const post = this.SpecialtyModel.build(props);
    await post.save();

    return Specialty.build(post);
  }

  async getAll(filter?: Partial<SpecialtyProps>): Promise<Specialty[]> {
    const posts = await this.SpecialtyModel.find({ ...filter });
    return posts.map((post) => Specialty.build(post));
  }

  async getById(id: string): Promise<Specialty | null> {
    const postFound = await this.SpecialtyModel.findById(id);
    if (!postFound) return null;

    return Specialty.build(postFound);
  }

  async getOne(filter: Partial<SpecialtyProps>): Promise<Specialty | null> {
    const postFound = await this.SpecialtyModel.findOne(filter);
    if (!postFound) return null;

    return Specialty.build(postFound);
  }

  async delete(id: string): Promise<Specialty | null> {
    const postDeleted = await this.SpecialtyModel.findByIdAndDelete(id);
    if (!postDeleted) return null;

    return Specialty.build(postDeleted);
  }

  async update(id: string, props: Partial<SpecialtyProps>): Promise<Specialty | null> {
    const postUpdated = await this.SpecialtyModel.findByIdAndUpdate(id, props);
    if (!postUpdated) return null;

    return Specialty.build(postUpdated);
  }
}
