import { SpecialtiesRepository } from "../../data/repositories/SpecialtiesRepository";
import { Specialty } from "../../domain/entities/Specialty";
import {SpecialtyProps} from "../../domain/entities/types";
import {Service} from "./Service";

interface SpecialtiesServiceProps {
  specialtiesRepository: SpecialtiesRepository;
}

export class SpecialtiesService implements Service<Specialty, SpecialtyProps>{
  private specialtiesRepository: SpecialtiesRepository;

  constructor({ specialtiesRepository }: SpecialtiesServiceProps) {
    this.specialtiesRepository = specialtiesRepository;
  }

  async get(filter?: Partial<SpecialtyProps>): Promise<Specialty[]> {
    const specialtiesFound = await this.specialtiesRepository.getAll(filter);

    return specialtiesFound;
  }

  async getById(id: string): Promise<Specialty | null> {
    const specialtyFound = await this.specialtiesRepository.getById(id);
    console.log('specialtyFound', specialtyFound);
    if (!specialtyFound) return null;

    return specialtyFound;
  }

  async getOne(specialty: Partial<SpecialtyProps>): Promise<Specialty | null> {
    const specialtyFound = await this.specialtiesRepository.getOne(specialty);
    if (!specialtyFound) return null;

    return specialtyFound;
  }

  async create(specialty: Specialty): Promise<Specialty> {
    const newPost = Specialty.build(specialty);
    return await this.specialtiesRepository.create(newPost);
  }

  async update(id: string, specialty: Partial<Specialty>): Promise<Specialty | null> {
    const specialtyUpdated = await this.specialtiesRepository.update(id, specialty);
    if (!specialtyUpdated) return null;

    return Specialty.build(specialtyUpdated);
  }

  async delete(id: string): Promise<Specialty | null> {
    const specialtyDeleted = await this.specialtiesRepository.delete(id);
    if (!specialtyDeleted) return null;

    return specialtyDeleted;
  }
}
