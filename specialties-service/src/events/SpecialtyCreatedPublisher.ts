import {
    Publisher,
    SpecialtyCreatedEvent,
    Subjects,
} from "@mv-consultation-platform/common";

export class SpecialtyCreatedPublisher extends Publisher<SpecialtyCreatedEvent> {
    subject: SpecialtyCreatedEvent["subject"] = Subjects.SpecialtyCreated;
}