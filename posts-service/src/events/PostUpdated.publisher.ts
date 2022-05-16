import {
    PostUpdatedEvent,
    Publisher,
    Subjects,
} from "@mv-consultation-platform/common";

export class PostUpdatedPublisher extends Publisher<PostUpdatedEvent> {
    subject: PostUpdatedEvent["subject"] = Subjects.PostUpdated;
}