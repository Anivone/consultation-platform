export interface ConsultationProps {
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
}