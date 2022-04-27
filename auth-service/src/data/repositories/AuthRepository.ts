import { UserMod } from "../schemas/UserSchema";
import { UserProps } from "../../domain/entities/types";
import { User } from "../../domain/entities/User";
import { Repository } from "./Repository";

interface AuthRepProps {
  UserModel: UserMod;
}

export class AuthRepository implements Repository<User, UserProps> {
  private UserModel: UserMod;

  constructor({ UserModel }: AuthRepProps) {
    this.UserModel = UserModel;
  }

  async getAll(filter?: UserProps): Promise<User[]> {
    const users = await this.UserModel.find({});
    return users.map((user) => User.build(user));
  }

  async getOne(filterProps: Partial<UserProps>): Promise<User | null> {
    const user = await this.UserModel.findOne(filterProps);
    if (!user) return null;

    return User.build(user);
  }

  async getById(id: string): Promise<User | null> {
    const user = await this.UserModel.findById(id);
    if (!user) return null;

    return User.build(user);
  }

  async create(props: UserProps) {
    const user = this.UserModel.build(props);
    await user.save();

    return User.build(user);
  }
}
