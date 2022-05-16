import {
  PostViewedEvent,
  Publisher,
  Subjects,
} from "@mv-consultation-platform/common";

export class PostViewedPublisher extends Publisher<PostViewedEvent> {
  subject: PostViewedEvent["subject"] = Subjects.PostViewed;
}