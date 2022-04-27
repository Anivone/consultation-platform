import * as mongoose from "mongoose";
import { UserProps } from "../../domain/entities/types";
import { Password } from "../../infrastructure/utils/Password";
import { User } from "../../domain/entities/User";

interface UserDoc extends Omit<UserProps, "id">, mongoose.Document {}

export interface UserMod extends mongoose.Model<UserDoc> {
  build(props: UserProps): UserDoc;
}

const UserSchema = new mongoose.Schema<UserDoc>(
  {
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
    region: {
      type: String,
      required: false,
    },
    city: {
      type: String,
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
  },
  {
    toObject: {
      transform: (doc, ret) => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

UserSchema.pre("save", async function (done: any) {
  if (this.isModified("password")) {
    const hashed = await Password.toHash(this.get("password"));
    this.set("password", hashed);
  }
  done();
});

UserSchema.statics.build = (props: UserProps) => {
  return new UserModel(props);
};

const UserModel = mongoose.model<UserDoc, UserMod>("User", UserSchema);

export default UserModel;
