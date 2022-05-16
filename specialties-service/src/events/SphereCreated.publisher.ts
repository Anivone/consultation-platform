import {
  Publisher,
  Subjects,
  SphereCreatedEvent,
} from "@mv-consultation-platform/common";

export class SphereCreatedPublisher extends Publisher<SphereCreatedEvent> {
  subject: Subjects.SphereCreated = Subjects.SphereCreated;
}
