import mongoose, { Document, Model } from "mongoose";
import { CommentProps } from "../../domain/entities/types";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

export interface CommentDoc extends Omit<CommentProps, "id">, Document {}

export interface CommentMod extends Model<CommentDoc> {
  build(props: CommentProps): CommentDoc;
}

const CommentSchema = new mongoose.Schema(
  {
    text: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    postId: {
      type: String,
      required: true,
    },
    points: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
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

CommentSchema.set("versionKey", "version");
CommentSchema.plugin(updateIfCurrentPlugin);

CommentSchema.statics.build = (props: CommentProps) => {
  return new CommentModel(props);
};

const CommentModel = mongoose.model<CommentDoc, CommentMod>(
  "Comment",
  CommentSchema
);

export default CommentModel;
