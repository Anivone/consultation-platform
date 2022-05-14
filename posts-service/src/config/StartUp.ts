import { ExpressApplication } from "./ExpressApplication";
import mongoose from "mongoose";
import { natsWrapper } from "@mv-consultation-platform/common";
import {SpecialtyCreatedListener} from "../events/SpecialtyCreatedListener";

export class StartUp {
  server: ExpressApplication;

  constructor() {
    this.server = new ExpressApplication();
  }

  async start() {
    if (!process.env.MONGO_URI) {
      throw new Error("MONGO_URI must be provided");
    }
    if (!process.env.JWT_KEY) {
      throw new Error("JWT_KEY must be provided");
    }
    if (!process.env.NATS_CLIENT_ID) {
      throw new Error("NATS_CLIENT_ID must be defined");
    }
    if (!process.env.NATS_URL) {
      throw new Error("NATS_URL must be defined");
    }
    if (!process.env.NATS_CLUSTER_ID) {
      throw new Error("NATS_CLUSTER_ID must be defined");
    }

    try {
      await natsWrapper.connect(
        process.env.NATS_CLUSTER_ID,
        process.env.NATS_CLIENT_ID,
        process.env.NATS_URL
      );
      natsWrapper.client.on("close", () => {
        console.log("NATS connection closed!");
        process.exit();
      });
      process.on("SIGINT", () => natsWrapper.client.close());
      process.on("SIGTERM", () => natsWrapper.client.close());

      new SpecialtyCreatedListener(natsWrapper.client).listen();

      await mongoose.connect(process.env.MONGO_URI);
      console.log("Successfully connected to MongoDB");
    } catch (err) {
      console.error(err);
    }

    this.server.app.listen(3000, () => {
      console.log("Server is listening on port 3000");
    });
  }
}
