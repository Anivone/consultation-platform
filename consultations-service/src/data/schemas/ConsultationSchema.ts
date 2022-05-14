import mongoose, { Document, Model } from "mongoose";
import { updateIfCurrentPlugin } from "mongoose-update-if-current";

import { ConsultationProps } from "../../domain/entities/types";
import { Consultation } from "../../domain/entities/Consultation";

export interface ConsultationDoc
  extends Omit<ConsultationProps, "id">,
    Document {}

export interface ConsultationMod extends Model<ConsultationDoc> {
  build(props: ConsultationProps): ConsultationDoc;
}

const ConsultationSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
    },
    userId: {
      type: String,
      required: true,
    },
    consultantId: {
      type: String,
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
    companyName: {
      type: String,
      required: false,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
  },
  {
    toJSON: {
      transform: (doc, ret) => {
        ret.id = doc._id;
        delete doc._id;
        delete doc.__v;
      },
    },
  }
);

ConsultationSchema.set("versionKey", "version");
ConsultationSchema.plugin(updateIfCurrentPlugin);

ConsultationSchema.statics.build = (props: ConsultationProps) => {
  return new ConsultationModel(props);
};

const ConsultationModel = mongoose.model<ConsultationDoc, ConsultationMod>(
  "Consultation",
  ConsultationSchema
);

export default ConsultationModel;
