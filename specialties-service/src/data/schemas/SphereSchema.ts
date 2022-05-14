import mongoose, { Document, Model } from "mongoose";
import { SphereProps } from "../../domain/entities/types";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";
import { setProps } from "@mv-consultation-platform/common";
import { Sphere } from "../../domain/entities/Sphere";

export interface SphereDoc extends Omit<SphereProps, "id">, Document {}

export interface SphereMod extends Model<SphereDoc> {
  build(props: SphereProps): SphereDoc;
  setProps(doc: SphereDoc, props: Partial<SphereProps>): SphereDoc;
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

SphereSchema.set("versionKey", "version");
SphereSchema.plugin(updateIfCurrentPlugin);

SphereSchema.statics.setProps = setProps;

SphereSchema.statics.build = (props: SphereProps) => {
  return new SphereModel(props);
};

const SphereModel = mongoose.model<SphereDoc, SphereMod>(
  "Sphere",
  SphereSchema
);

export default SphereModel;
