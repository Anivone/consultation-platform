import {
  PostDetailedCreatedEvent,
  Publisher,
  Subjects,
} from "@mv-consultation-platform/common";

export class PostDetailedCreatedPublisher extends Publisher<PostDetailedCreatedEvent> {
  subject: PostDetailedCreatedEvent["subject"] = Subjects.PostDetailedCreated;
}