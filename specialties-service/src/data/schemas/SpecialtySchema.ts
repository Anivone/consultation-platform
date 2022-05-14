import mongoose, { Document, Model } from "mongoose";
import {PostProps, PostStatus} from "../../domain/entities/types";

export interface PostDoc extends Omit<PostProps, 'id'>, Document {}

export interface PostMod extends Model<PostDoc> {
    build(props: PostProps): PostDoc;
}

const PostSchema = new mongoose.Schema({
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
    },
    edited: {
        type: Boolean,
        required: true,
    },
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

PostSchema.statics.build = (props: PostProps) => {
    return new PostModel(props);
}

const PostModel = mongoose.model<PostDoc, PostMod>('Post', PostSchema);

export default PostModel;