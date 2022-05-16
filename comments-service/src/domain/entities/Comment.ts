import { CommentProps } from "./types";
import { IsNotEmpty, IsNumber, ValidateIf } from "class-validator";
import {CommentStatus} from "@mv-consultation-platform/common";

export class Comment implements CommentProps {
  id?: string;

  @ValidateIf(() => false)
  version: number;

  @IsNotEmpty({
    message: "Text must be provided",
  })
  text: string;

  @IsNotEmpty({
    message: "UserId must be provided",
  })
  userId: string;

  @IsNotEmpty({
    message: "PostId must be provided",
  })
  postId: string;

  @IsNumber(undefined, {
    message: "Points must be a number",
  })
  points?: number;

  status?: CommentStatus;

  constructor(
    version: number,
    text: string,
    userId: string,
    postId: string,
    id?: string,
    points: number = 0,
    status: CommentStatus = CommentStatus.DRAFT,
  ) {
    this.id = id;
    this.version = version
    this.text = text;
    this.userId = userId;
    this.postId = postId;
    this.points = points;
    this.status = status;
  }

  static build({ id, version, text, userId, postId, points, status }: CommentProps) {
    return new Comment(version, text, userId, postId, id, points, status);
  }
}
