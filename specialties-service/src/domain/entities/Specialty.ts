import { SpecialtyProps } from "./types";

export class Specialty implements SpecialtyProps {
  id?: string;
  version: number;
  name: string;
  sphereId: string;

  constructor(version: number, name: string, sphereId: string, id?: string) {
    this.id = id;
    this.version = version;
    this.name = name;
    this.sphereId = sphereId
  }

  static build({ id, version, name, sphereId }: SpecialtyProps) {
    return new Specialty(version, name, sphereId, id);
  }
}
