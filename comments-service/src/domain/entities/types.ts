export enum CommentStatus {
    POSTED = 'posted',
    DRAFT = 'draft'
}

export interface CommentProps {
    id?: string;
    version: number;
    text: string;
    userId: string;
    postId: string;
    points?: number;
    status?: CommentStatus;
}