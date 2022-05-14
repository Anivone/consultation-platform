import { Repository } from "./Repository";
import { Specialty } from "../../domain/entities/Specialty";
import { SpecialtyProps } from "../../domain/entities/types";
import SpecialtyModel, { SpecialtyMod } from "../schemas/SpecialtySchema";

interface SpecialtiesRepositoryProps {
  SpecialtyModel: SpecialtyMod;
}

export class SpecialtiesRepository
  implements Repository<Specialty, SpecialtyProps>
{
  private SpecialtyModel: SpecialtyMod;

  constructor({ SpecialtyModel }: SpecialtiesRepositoryProps) {
    this.SpecialtyModel = SpecialtyModel;
  }

  async create(props: SpecialtyProps): Promise<Specialty> {
    const specialty = this.SpecialtyModel.build(props);
    await specialty.save();

    return Specialty.build(specialty);
  }

  async getAll(filter?: Partial<SpecialtyProps>): Promise<Specialty[]> {
    const specialties = await this.SpecialtyModel.find({ ...filter });
    return specialties.map((specialty) => Specialty.build(specialty));
  }

  async getById(id: string): Promise<Specialty | null> {
    const specialtyFound = await this.SpecialtyModel.findById(id);
    if (!specialtyFound) return null;

    return Specialty.build(specialtyFound);
  }

  async getOne(filter: Partial<SpecialtyProps>): Promise<Specialty | null> {
    const specialtyFound = await this.SpecialtyModel.findOne(filter);
    if (!specialtyFound) return null;

    return Specialty.build(specialtyFound);
  }

  async delete(id: string): Promise<Specialty | null> {
    const specialtyDeleted = await this.SpecialtyModel.findByIdAndDelete(id);
    if (!specialtyDeleted) return null;

    return Specialty.build(specialtyDeleted);
  }

  async update(
    id: string,
    props: Partial<SpecialtyProps>
  ): Promise<Specialty | null> {
    const specialtyUpdated = await this.SpecialtyModel.findById(id);
    if (!specialtyUpdated) return null;

    SpecialtyModel.setProps(specialtyUpdated, props);
    await specialtyUpdated.save();

    return Specialty.build(specialtyUpdated);
  }
}
