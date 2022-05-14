import { Repository } from "./Repository";
import { Sphere } from "../../domain/entities/Sphere";
import { SphereProps } from "../../domain/entities/types";
import { SphereMod } from "../schemas/SphereSchema";

interface SpheresRepositoryProps {
  SphereModel: SphereMod;
}

export class SpheresRepository implements Repository<Sphere, SphereProps> {
  private SphereModel: SphereMod;

  constructor({ SphereModel }: SpheresRepositoryProps) {
    this.SphereModel = SphereModel;
  }

  async create(props: SphereProps): Promise<Sphere> {
    const sphere = this.SphereModel.build(props);
    await sphere.save();

    return Sphere.build(sphere);
  }

  async getAll(filter?: Partial<SphereProps>): Promise<Sphere[]> {
    const spheres = await this.SphereModel.find({ ...filter });
    return spheres.map((sphere) => Sphere.build(sphere));
  }

  async getById(id: string): Promise<Sphere | null> {
    const sphereFound = await this.SphereModel.findById(id);
    if (!sphereFound) return null;

    return Sphere.build(sphereFound);
  }

  async getOne(filter: Partial<SphereProps>): Promise<Sphere | null> {
    const sphereFound = await this.SphereModel.findOne(filter);
    if (!sphereFound) return null;

    return Sphere.build(sphereFound);
  }

  async delete(id: string): Promise<Sphere | null> {
    const sphereDeleted = await this.SphereModel.findByIdAndDelete(id);
    if (!sphereDeleted) return null;

    return Sphere.build(sphereDeleted);
  }

  async update(
    id: string,
    props: Partial<SphereProps>
  ): Promise<Sphere | null> {
    const sphereUpdated = await this.SphereModel.findById(id);
    if (!sphereUpdated) return null;

    this.SphereModel.setProps(sphereUpdated, props);
    await sphereUpdated.save();

    return Sphere.build(sphereUpdated);
  }
}
