export enum PostStatus {
    ACTIVE = "active",
    DRAFT = "draft",
    CLOSED = "closed",
}

export interface PostProps {
    id?: string;
    title: string;
    description: string;
    userId: string;
    relevancePoints?: number;
    date: Date;
    views?: number;
    sphereId: string;
    specialty: string;
    status?: PostStatus;
    edited?: boolean;
}
