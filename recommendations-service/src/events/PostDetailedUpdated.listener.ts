import {
  Listener,
  PostDetailedUpdatedEvent,
  Subjects,
} from "@mv-consultation-platform/common";
import { queueGroupName } from "./queueGroupName";
import { Message } from "node-nats-streaming";
import PostModel from "../data/schemas/PostSchema";

export class PostDetailedUpdatedListener extends Listener<PostDetailedUpdatedEvent> {
  subject: PostDetailedUpdatedEvent["subject"] = Subjects.PostDetailedUpdated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: PostDetailedUpdatedEvent["data"], msg: Message) {
    const postFound = await PostModel.findByEvent(data);
    if (!postFound) {
      throw new Error('No Post found!');
    }

    PostModel.setProps(postFound, data);
    await postFound.save();

    msg.ack();
  }
}