import {
  Listener,
  PostDetailedCreatedEvent,
  Subjects,
} from "@mv-consultation-platform/common";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import PostModel from "../data/schemas/PostSchema";

export class PostDetailedCreatedListener extends Listener<PostDetailedCreatedEvent> {
  subject: PostDetailedCreatedEvent["subject"] = Subjects.PostDetailedCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: PostDetailedCreatedEvent["data"], msg: Message) {
    const post = await PostModel.build(data);
    await post.save();

    msg.ack();
  }
}