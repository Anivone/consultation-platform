import {
  Listener,
  PostViewedEvent,
  Subjects,
} from "@mv-consultation-platform/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import PostModel from "../data/schemas/PostSchema";
import UserPostsViewedModel from "../data/schemas/UserPostsViewedSchema";

export class PostViewedListener extends Listener<PostViewedEvent> {
  subject: PostViewedEvent["subject"] = Subjects.PostViewed;
  queueGroupName: string = queueGroupName;

  async onMessage(data: PostViewedEvent["data"], msg: Message) {
    const postFound = await PostModel.findById(data.postId);
    if (!postFound) {
      throw new Error("No Post found!");
    }

    postFound.set("views", postFound.views! + 1);
    await postFound.save();

    const postViewedFound = await UserPostsViewedModel.findOne({
      userId: data.userId,
    });
    if (!postViewedFound) {
      throw new Error("No UserPostViewed found!");
    }

    const postAlreadyViewed = !!postViewedFound.postIds.find(
      (postId) => postId === data.postId
    );
    const newPostIds = postViewedFound.postIds;

    if (!postAlreadyViewed) {
      newPostIds.push(data.postId);
    }

    postViewedFound.set("postIds", newPostIds);
    await postViewedFound.save();

    msg.ack();
  }
}