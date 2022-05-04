import { Repository } from "./Repository";
import { ConsultationProps } from "../../domain/entities/types";
import { Consultation } from "../../domain/entities/Consultation";
import ConsultationModel, { ConsultationMod } from "../schemas/ConsultationSchema";

interface ConsultationRepositoryProps {
    ConsultationModel: ConsultationMod;
}

export class ConsultationsRepository implements Repository<Consultation, ConsultationProps> {
    private ConsultationModel: ConsultationMod;

    constructor({ ConsultationModel }: ConsultationRepositoryProps) {
        this.ConsultationModel = ConsultationModel;
    }

    async create(props: ConsultationProps): Promise<Consultation> {
        const newConsultation = ConsultationModel.build(props);
        await newConsultation.save();

        return Consultation.build(newConsultation);
    }

    async delete(id: string): Promise<Consultation | null> {
        const consultationDeleted = await this.ConsultationModel.findByIdAndDelete(id);
        if (!consultationDeleted) return null;

        return Consultation.build(consultationDeleted);
    }

    async getAll(filter?: Partial<ConsultationProps>): Promise<Consultation[]> {
        const consultations = await this.ConsultationModel.find({ ...filter });

        return consultations.map((consultation) => Consultation.build(consultation));
    }

    async getById(id: string): Promise<Consultation | null> {
        const consultationFound = await this.ConsultationModel.findById(id);
        if (!consultationFound) return null;

        return Consultation.build(consultationFound);
    }

    async getOne(filter: Partial<ConsultationProps>): Promise<Consultation | null> {
        const consultationFound = await this.ConsultationModel.findOne(filter);
        if (!consultationFound) return null;

        return Consultation.build(consultationFound);
    }

    async update(
        id: string,
        props: Partial<ConsultationProps>
    ): Promise<Consultation | null> {
        const consultationUpdated = await this.ConsultationModel.findByIdAndUpdate(id, props);
        if (!consultationUpdated) return null;

        return Consultation.build(consultationUpdated);
    }
}
