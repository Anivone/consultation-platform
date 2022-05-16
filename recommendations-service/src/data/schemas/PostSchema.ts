import { PostStatus, setProps } from "@mv-consultation-platform/common";
import mongoose, { Document, Model } from "mongoose";
import { PostProps } from "../../domain/entities/types";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { Post } from "../../domain/entities/Post";

export interface PostDoc extends Omit<PostProps, "id">, Document {}

export interface PostMod extends Model<PostDoc> {
  build(props: PostProps): PostDoc;

  findByEvent(event: { id: string; version: number }): PostDoc;

  setProps(doc: PostDoc, props: Partial<PostProps>): PostDoc;
}

const PostSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    relevancePoints: {
      type: Number,
      required: true,
    },
    date: {
      type: Date,
      required: true,
    },
    views: {
      type: Number,
      required: true,
    },
    sphereId: {
      type: String,
      required: true,
    },
    specialty: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      required: true,
      enum: PostStatus,
      default: PostStatus.DRAFT,
    },
    edited: {
      type: Boolean,
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

PostSchema.set("versionKey", "version");
PostSchema.plugin(updateIfCurrentPlugin);

PostSchema.statics.setProps = setProps;

PostSchema.statics.findByEvent = async (event: {
  id: string;
  version: number;
}) => {
  return PostModel.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

PostSchema.statics.build = (props: PostProps) => {
  return new PostModel({
    _id: props.id,
    ...props,
  });
};

const PostModel = mongoose.model<PostDoc, PostMod>("Post", PostSchema);

export default PostModel;
