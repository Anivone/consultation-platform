import { Request } from "express";
import SpecialtyModel, { SpecialtyMod } from "../data/schemas/SpecialtySchema";
import { SpecialtiesRepository } from "../data/repositories/SpecialtiesRepository";
import { createContainer, asValue, asClass, AwilixContainer } from "awilix";
import { SpecialtiesService } from "../infrastructure/services/SpecialtiesService";
import { SpheresRepository } from "../data/repositories/SpheresRepository";
import { SpheresService } from "../infrastructure/services/SpheresService";
import SphereModel, { SphereMod } from "../data/schemas/SphereSchema";

export interface MyRequest extends Request {
  container: AwilixContainer<MyContainer>;
}

interface MyContainer {
  SpecialtyModel: SpecialtyMod;
  SphereModel: SphereMod;
  specialtiesRepository: SpecialtiesRepository;
  spheresRepository: SpheresRepository;
  specialtiesService: SpecialtiesService;
  spheresService: SpheresService;
}

export default function initContainer() {
  const container = createContainer<MyContainer>();

  container.register({
    SpecialtyModel: asValue(SpecialtyModel),
    SphereModel: asValue(SphereModel),

    // Repositories

    specialtiesRepository: asClass(SpecialtiesRepository).singleton(),
    spheresRepository: asClass(SpheresRepository).singleton(),

    // Services

    specialtiesService: asClass(SpecialtiesService).singleton(),
    spheresService: asClass(SpheresService).singleton(),
  });

  return container;
}
