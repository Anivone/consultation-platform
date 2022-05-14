import { SpecialtiesRepository } from "../../data/repositories/SpecialtiesRepository";
import { Specialty } from "../../domain/entities/Specialty";
import {SpecialtyProps} from "../../domain/entities/types";
import {Service} from "./Service";
import {SpecialtyCreatedPublisher} from "../../events/SpecialtyCreatedPublisher";
import {natsWrapper} from "@mv-consultation-platform/common";

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
    const newSpecialty = Specialty.build(specialty);
    const specialtyCreated = await this.specialtiesRepository.create(newSpecialty);

    await new SpecialtyCreatedPublisher(natsWrapper.client).publish({
      id: specialtyCreated.id!,
      name: specialtyCreated.name,
      sphereId: specialtyCreated.sphereId,
    });

    return specialtyCreated;
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
