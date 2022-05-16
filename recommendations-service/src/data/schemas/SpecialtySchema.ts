import mongoose, { Document, Model } from "mongoose";
import { SpecialtyProps } from "../../domain/entities/types";

export interface SpecialtyDoc extends Omit<SpecialtyProps, "id">, Document {}

export interface SpecialtyMod extends Model<SpecialtyDoc> {
  build(props: SpecialtyProps): SpecialtyDoc;

  findByEvent(event: {
    id: string;
    version: number;
  }): Promise<SpecialtyDoc | null>;
}

const SpecialtySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    sphereId: {
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

SpecialtySchema.statics.findByEvent = (event: {
  id: string;
  version: number;
}) => {
  return SpecialtyModel.findOne({
    _id: event.id,
    version: event.version - 1,
  });
};

SpecialtySchema.statics.build = (props: SpecialtyProps) => {
  return new SpecialtyModel({
    _id: props.id,
    name: props.name,
    sphereId: props.sphereId,
  });
};

const SpecialtyModel = mongoose.model<SpecialtyDoc, SpecialtyMod>(
  "Specialty",
  SpecialtySchema
);

export default SpecialtyModel;
