import {
  PostCreatedEvent,
  Publisher,
  Subjects,
} from "@mv-consultation-platform/common";

export class PostCreatedPublisher extends Publisher<PostCreatedEvent> {
  subject: PostCreatedEvent["subject"] = Subjects.PostCreated;
}