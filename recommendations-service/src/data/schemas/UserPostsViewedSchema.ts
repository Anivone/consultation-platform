import mongoose, { Document, Model } from "mongoose";
import { UserPostsViewedProps } from "../../domain/entities/types";

export interface UserPostsViewedDoc extends Omit<UserPostsViewedProps, "id">, Document {}

export interface UserPostsViewedMod extends Model<UserPostsViewedDoc> {
  build(props: { userId: string, postIds: string[] }): UserPostsViewedDoc;

  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<UserPostsViewedDoc | null>;
}

const UserPostsViewedSchema = new mongoose.Schema(
  {
    userId: {
      type: String,
      required: true,
    },
    postIds: {
      type: [String],
      required: true,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

UserPostsViewedSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return UserPostsViewedModel.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

UserPostsViewedSchema.statics.build = (props: { userId: string, postIds: string[] }) => {
  return new UserPostsViewedModel({
    userId: props.userId,
    postIds: props.postIds,
  });
};

const UserPostsViewedModel = mongoose.model<UserPostsViewedDoc, UserPostsViewedMod>(
  "UserPostsViewed",
  UserPostsViewedSchema
);

export default UserPostsViewedModel;
