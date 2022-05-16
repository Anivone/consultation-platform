import mongoose, { Document, Model } from "mongoose";
import { SphereProps } from "../../domain/entities/types";

export interface SphereDoc extends Omit<SphereProps, "id">, Document {}

export interface SphereMod extends Model<SphereDoc> {
  build(props: SphereProps): SphereDoc;

  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<SphereDoc | null>;
}

const SphereSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    tags: {
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

SphereSchema.statics.findByEvent = (event: { id: string; version: number }) => {
  return SphereModel.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

SphereSchema.statics.build = (props: SphereProps) => {
  return new SphereModel({
    _id: props.id,
    name: props.name,
    tags: props.tags,
  });
};

const SphereModel = mongoose.model<SphereDoc, SphereMod>(
  "Sphere",
  SphereSchema
);

export default SphereModel;
