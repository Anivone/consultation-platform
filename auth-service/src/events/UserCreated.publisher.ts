import {
  Publisher,
  Subjects,
  UserCreatedEvent,
} from "@mv-consultation-platform/common";

export class UserCreatedPublisher extends Publisher<UserCreatedEvent> {
  subject: UserCreatedEvent["subject"] = Subjects.UserCreated;
}