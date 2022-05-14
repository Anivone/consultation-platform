import { SphereProps } from "./types";

export class Sphere implements SphereProps {
    id?: string;
    version: number;
    name: string;
    tags: string[];

    constructor(version: number, name: string, id?: string, tags: string[] = []) {
        this.id = id;
        this.version = version;
        this.name = name;
        this.tags = tags;
    }

    static build({ id, version, name, tags }: SphereProps) {
        return new Sphere(version, name, id, tags);
    }
}
