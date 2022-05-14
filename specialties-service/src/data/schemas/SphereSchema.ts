import mongoose, { Document, Model } from "mongoose";
import {SpecialtyProps} from "../../domain/entities/types";
import {updateIfCurrentPlugin} from "mongoose-update-if-current";

export interface SpecialtyDoc extends Omit<SpecialtyProps, 'id'>, Document {}

export interface SpecialtyMod extends Model<SpecialtyDoc> {
    build(props: SpecialtyProps): SpecialtyDoc;
}

const SpecialtySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
    },
    sphereId: {
        type: String,
        required: true,
    }
}, {
    toJSON: {
        transform: (doc, ret) => {
            ret.id = ret._id;
            delete ret._id;
            delete ret.__v;
        }
    }
});

SpecialtySchema.set('versionKey', 'version');
SpecialtySchema.plugin(updateIfCurrentPlugin);

SpecialtySchema.statics.build = (props: SpecialtyProps) => {
    return new SpecialtyModel(props);
}

const SpecialtyModel = mongoose.model<SpecialtyDoc, SpecialtyMod>('Specialty', SpecialtySchema);

export default SpecialtyModel;