import { ConsultationProps } from "./types";

export class Consultation implements ConsultationProps {
  id?: string;
  version: number;
  title: string;
  userId: string;
  consultantId: string;
  sphereId: string;
  specialty: string;
  companyName?: string;
  description: string;
  price: number;

  constructor(
    version: number,
    title: string,
    userId: string,
    consultantId: string,
    sphereId: string,
    specialty: string,
    description: string,
    price: number,
    id?: string,
    companyName?: string
  ) {
    this.id = id;
    this.version = version;
    this.title = title;
    this.userId = userId;
    this.consultantId = consultantId;
    this.sphereId = sphereId;
    this.specialty = specialty;
    this.companyName = companyName;
    this.description = description;
    this.price = price;
  }

  static build({
    id,
    version,
    title,
    userId,
    consultantId,
    sphereId,
    specialty,
    companyName,
    description,
    price,
  }: ConsultationProps) {
    return new Consultation(
      version,
      title,
      userId,
      consultantId,
      sphereId,
      specialty,
      description,
      price,
      id,
      companyName
    );
  }
}
