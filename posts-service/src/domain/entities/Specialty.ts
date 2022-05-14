import { SpecialtyProps } from "./types";

export class Specialty implements SpecialtyProps {
    id?: string;
    name: string;
    sphereId: string;

    constructor(name: string, sphereId: string, id?: string) {
        this.id = id;
        this.name = name;
        this.sphereId = sphereId
    }

    static build({ id, name, sphereId }: SpecialtyProps) {
        return new Specialty(name, sphereId, id);
    }
}
