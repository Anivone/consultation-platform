import { ConsultationsRepository } from "../../data/repositories/ConsultationsRepository";
import { Service } from "./Service";
import { ConsultationProps } from "../../domain/entities/types";
import { Consultation } from "../../domain/entities/Consultation";

interface ConsultationsServiceProps {
  consultationsRepository: ConsultationsRepository;
}

export class ConsultationsService implements Service<Consultation, ConsultationProps> {
  private consultationsRepository: ConsultationsRepository;

  constructor({ consultationsRepository }: ConsultationsServiceProps) {
    this.consultationsRepository = consultationsRepository;
  }

  async create(props: ConsultationProps): Promise<Consultation> {
    const newConsultation = await this.consultationsRepository.create(
      Consultation.build(props)
    );

    return newConsultation;
  }

  async delete(id: string): Promise<Consultation | null> {
    const consultationDeleted = await this.consultationsRepository.delete(id);
    if (!consultationDeleted) return null;

    return consultationDeleted;
  }

  async get(filter?: Partial<ConsultationProps>): Promise<Consultation[]> {
    const consultations = await this.consultationsRepository.getAll(filter);

    return consultations;
  }

  async getById(id: string): Promise<Consultation | null> {
    const consultationFound = await this.consultationsRepository.getById(id);
    if (!consultationFound) return null;

    return consultationFound;
  }

  async getOne(filter: Partial<ConsultationProps>): Promise<Consultation | null> {
    const consultationFound = await this.consultationsRepository.getOne(filter);
    if (!consultationFound) return null;

    return consultationFound;
  }

  async update(
    id: string,
    props: Partial<ConsultationProps>
  ): Promise<Consultation | null> {
    const consultationUpdated = await this.consultationsRepository.update(id, props);
    if (!consultationUpdated) return null;

    return consultationUpdated;
  }
}
