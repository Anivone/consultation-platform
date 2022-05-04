import { Request } from "express";
import { createContainer, asValue, asClass, AwilixContainer } from "awilix";
import ConsultationModel, { ConsultationMod } from "../data/schemas/ConsultationSchema";
import { ConsultationsRepository } from "../data/repositories/ConsultationsRepository";
import { ConsultationsService } from "../infrastructure/services/ConsultationsService";

export interface MyRequest extends Request {
  container: AwilixContainer<MyContainer>;
}

interface MyContainer {
  ConsultationModel: ConsultationMod;
  consultationsRepository: ConsultationsRepository;
  consultationsService: ConsultationsService;
}

export default function initContainer() {
  const container = createContainer<MyContainer>();

  container.register({
    ConsultationModel: asValue(ConsultationModel),

    // Repositories

    consultationsRepository: asClass(ConsultationsRepository).singleton(),

    // Services

    consultationsService: asClass(ConsultationsService).singleton(),
  });

  return container;
}
