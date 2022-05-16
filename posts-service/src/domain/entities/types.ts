import {PostStatus} from "@mv-consultation-platform/common";

export interface PostProps {
  id?: string;
  version: number;
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

export interface SpecialtyProps {
  id?: string;
  name: string;
  sphereId: string;
}

export interface SphereProps {
  id?: string;
  name: string;
  tags: string[];
}
