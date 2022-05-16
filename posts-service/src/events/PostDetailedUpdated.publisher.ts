import {
  PostDetailedUpdatedEvent,
  Publisher,
  Subjects,
} from "@mv-consultation-platform/common";

export class PostDetailedUpdatedPublisher extends Publisher<PostDetailedUpdatedEvent> {
  subject: PostDetailedUpdatedEvent["subject"] = Subjects.PostDetailedUpdated;
}