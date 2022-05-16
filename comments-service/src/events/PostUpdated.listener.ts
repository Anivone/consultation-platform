import { Message } from "node-nats-streaming";
import {
  Listener,
  PostUpdatedEvent,
  Subjects,
} from "@mv-consultation-platform/common";
import { queueGroupName } from "./queueGroupName";
import PostModel from "../data/schemas/PostSchema";

export class PostUpdatedListener extends Listener<PostUpdatedEvent> {
  subject: PostUpdatedEvent["subject"] = Subjects.PostUpdated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: PostUpdatedEvent["data"], msg: Message) {
    const postFound = await PostModel.findByEvent(data);
    if (!postFound) {
      throw new Error("No Post found !");
    }

    PostModel.setProps(postFound, data);
    await postFound.save();

    msg.ack();
  }
}
