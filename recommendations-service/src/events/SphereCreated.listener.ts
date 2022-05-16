import { queueGroupName } from "./queueGroupName";
import { SphereCreatedEvent, Subjects } from "@mv-consultation-platform/common";
import { Listener } from "@mv-consultation-platform/common";
import { Message } from "node-nats-streaming";
import SphereModel from "../data/schemas/SphereSchema";

export class SphereCreatedListener extends Listener<SphereCreatedEvent> {
  subject: Subjects.SphereCreated = Subjects.SphereCreated;
  queueGroupName: string = queueGroupName;

  async onMessage(data: SphereCreatedEvent["data"], msg: Message) {
    const sphere = SphereModel.build(data);
    await sphere.save();

    console.log("sphere: ", sphere);

    msg.ack();
  }
}
