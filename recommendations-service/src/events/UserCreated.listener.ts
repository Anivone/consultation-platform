import { Listener, Subjects, UserCreatedEvent } from "@mv-consultation-platform/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import UserPostsViewedModel from "../data/schemas/UserPostsViewedSchema";

export class UserCreatedListener extends Listener<UserCreatedEvent> {
  subject: UserCreatedEvent["subject"] = Subjects.UserCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: UserCreatedEvent["data"], msg: Message) {
    const userPostViewed = await UserPostsViewedModel.build({
      userId: data.id,
      postIds: [],
    });
    await userPostViewed.save();

    msg.ack();
  }
}