import {CommentStatus, PostStatus} from "@mv-consultation-platform/common";

export interface CommentProps {
  id?: string;
  version: number;
  text: string;
  userId: string;
  postId: string;
  points?: number;
  status?: CommentStatus;
}

export interface PostProps {
    id?: string;
    version: number;
    title: string;
    userId: string;
    date: Date;
    sphereId: string;
    specialty: string;
    status?: PostStatus;
}
