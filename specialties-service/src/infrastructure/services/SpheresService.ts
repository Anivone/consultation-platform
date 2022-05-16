import { natsWrapper } from "@mv-consultation-platform/common";
import { SphereCreatedPublisher } from "./../../events/SphereCreated.publisher";
import { SpheresRepository } from "../../data/repositories/SpheresRepository";
import { Sphere } from "../../domain/entities/Sphere";
import { SphereProps } from "../../domain/entities/types";
import { Service } from "./Service";

interface SpheresServiceProps {
  spheresRepository: SpheresRepository;
}

export class SpheresService implements Service<Sphere, SphereProps> {
  private spheresRepository: SpheresRepository;

  constructor({ spheresRepository }: SpheresServiceProps) {
    this.spheresRepository = spheresRepository;
  }

  async get(filter?: Partial<SphereProps>): Promise<Sphere[]> {
    const spheresFound = await this.spheresRepository.getAll(filter);

    return spheresFound;
  }

  async getById(id: string): Promise<Sphere | null> {
    const sphereFound = await this.spheresRepository.getById(id);
    console.log("sphereFound", sphereFound);
    if (!sphereFound) return null;

    return sphereFound;
  }

  async getOne(sphere: Partial<SphereProps>): Promise<Sphere | null> {
    const sphereFound = await this.spheresRepository.getOne(sphere);
    if (!sphereFound) return null;

    return sphereFound;
  }

  async create(sphere: Sphere): Promise<Sphere> {
    const newSphere = Sphere.build(sphere);
    const sphereCreated = await this.spheresRepository.create(newSphere);

    await new SphereCreatedPublisher(natsWrapper.client).publish({
      id: sphereCreated.id!,
      name: sphereCreated.name,
      tags: sphereCreated.tags,
    });

    return sphereCreated;
  }

  async update(id: string, sphere: Partial<Sphere>): Promise<Sphere | null> {
    const sphereUpdated = await this.spheresRepository.update(id, sphere);
    if (!sphereUpdated) return null;

    return Sphere.build(sphereUpdated);
  }

  async delete(id: string): Promise<Sphere | null> {
    const sphereDeleted = await this.spheresRepository.delete(id);
    if (!sphereDeleted) return null;

    return sphereDeleted;
  }
}
