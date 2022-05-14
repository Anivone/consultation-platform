import {
  Listener,
  SpecialtyCreatedEvent,
  Subjects,
} from "@mv-consultation-platform/common";
import { Message } from "node-nats-streaming";
import { queueGroupName } from "./queueGroupName";
import SpecialtyModel from "../data/schemas/SpecialtySchema";

export class SpecialtyCreatedListener extends Listener<SpecialtyCreatedEvent> {
  queueGroupName: string = queueGroupName;
  subject: SpecialtyCreatedEvent["subject"] = Subjects.SpecialtyCreated;

  async onMessage(data: SpecialtyCreatedEvent["data"], msg: Message) {
    const { id, name, sphereId } = data;

    const specialty = SpecialtyModel.build({
      id,
      name,
      sphereId,
    });
    await specialty.save();

    msg.ack();
  }
}
