import * as mongoose from "mongoose";
import { UserProps } from "../../domain/entities/types";

interface UserDoc extends Omit<UserProps, "id">, mongoose.Document {}

interface UserModel extends mongoose.Model<UserDoc> {
  build(props: UserDoc): UserDoc;
}

const LocationSchema = new mongoose.Schema({
  region: {
    type: String,
    required: false,
  },
  city: {
    type: String,
    required: false,
  },
});

const UserSchema = new mongoose.Schema<UserDoc>({
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  phoneNumber: {
    type: String,
    required: false,
  },
  location: {
    type: LocationSchema,
    required: false,
  },
  isConsultant: {
    type: Boolean,
    required: true,
  },
  middleName: {
    type: String,
    required: false,
  },
  description: {
    type: String,
    required: false,
  },
  company: {
    type: String,
    required: false,
  },
  specialty: {
    type: String,
    required: false,
  },
  ratingId: {
    type: String,
    required: false,
  },
});

const UserModel = mongoose.model<UserDoc, UserModel>('User', UserSchema);

export default UserModel;
