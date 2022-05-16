import {
    Listener,
    PostCreatedEvent,
    Subjects,
} from "@mv-consultation-platform/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import PostModel from "../data/schemas/PostSchema";

export class PostCreatedListener extends Listener<PostCreatedEvent> {
    subject: PostCreatedEvent["subject"] = Subjects.PostCreated;
    queueGroupName: string = queueGroupName;

    async onMessage(data: PostCreatedEvent["data"], msg: Message) {
        const post = PostModel.build(data);
        await post.save();

        msg.ack();
    }
}