import { IsDate, IsNotEmpty, ValidateIf } from "class-validator";
import { PostProps, PostStatus } from "./types";

export class Post implements PostProps {
  id?: string;

  @ValidateIf(() => false)
  version: number;

  @IsNotEmpty({
    message: "Title must be provided",
  })
  title: string;

  @IsNotEmpty({
    message: "Description must be provided",
  })
  description: string;

  @IsNotEmpty({
    message: "UserId must be provided",
  })
  userId: string;

  relevancePoints?: number;

  @ValidateIf((object) => object.date)
  @IsDate({
    message: "Invalid date",
  })
  date: Date;

  views?: number;

  @IsNotEmpty({
    message: "SphereId must be provided",
  })
  sphereId: string;

  @IsNotEmpty({
    message: "Specialty must be provided",
  })
  specialty: string;

  status?: PostStatus;

  edited?: boolean;

  constructor(
    version: number,
    title: string,
    description: string,
    userId: string,
    sphereId: string,
    specialty: string,
    id?: string,
    relevancePoints: number = 0,
    date: Date = new Date(),
    status: PostStatus = PostStatus.DRAFT,
    views: number = 0,
    edited: boolean = false
  ) {
    this.id = id;
    this.version = version;
    this.title = title;
    this.description = description;
    this.userId = userId;
    this.relevancePoints = relevancePoints;
    this.date = date;
    this.views = views;
    this.sphereId = sphereId;
    this.specialty = specialty;
    this.status = status;
    this.edited = edited;
  }

  static build({
    id,
    version,
    title,
    description,
    userId,
    relevancePoints,
    date,
    views,
    sphereId,
    specialty,
    status,
    edited,
  }: PostProps) {
    return new Post(
      version,
      title,
      description,
      userId,
      sphereId,
      specialty,
      id,
      relevancePoints,
      date,
      status,
      views,
      edited
    );
  }
}
