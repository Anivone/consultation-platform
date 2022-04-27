import { ExpressApplication } from "./ExpressApplication";
import mongoose from "mongoose";

export class StartUp {
  private server: ExpressApplication;

  constructor() {
    this.server = new ExpressApplication();
  }

  async start() {
    if (!process.env.MONGO_URI) {
      throw new Error('MONGO_URI must be provided');
    }

    if (!process.env.JWT_KEY) {
      throw new Error('JWT_KEY must be provided');
    }

    await mongoose.connect(process.env.MONGO_URI);
    console.log('Successfully connected to MongoDB !');
    this.server.app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  }
}
