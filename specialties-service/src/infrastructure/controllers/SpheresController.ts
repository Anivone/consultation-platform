import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
  Req,
} from "routing-controllers";
import { Specialty } from "../../domain/entities/Specialty";
import { MyRequest } from "../../config/AwilixContainer";

@JsonController("/specialtys")
export class SpecialtiesController {
  @Get()
  async getSpecialties(@Req() req: MyRequest) {
    const { specialtiesService } = req.container.cradle;
    const specialties = await specialtiesService.get();

    return {
      specialties,
    };
  }

  @Get("/:id")
  async getSpecialty(@Param("id") id: string, @Req() req: MyRequest) {
    const { specialtiesService } = req.container.cradle;
    console.log("id", id);
    const specialtyFound = await specialtiesService.getById(id);
    console.log("specialtyFound: ", specialtyFound);

    return {
      specialty: specialtyFound,
    };
  }

  @Post()
  async createSpecialty(
    @Req()
    req: MyRequest,
    @Body()
    body: Specialty
  ) {
    const { specialtiesService } = req.container.cradle;
    const newSpecialty = await specialtiesService.create(body);

    return {
      specialty: newSpecialty,
    };
  }

  @Patch("/:id")
  async updateSpecialty(
    @Param("id")
    id: string,
    @Req()
    req: MyRequest,
    @Body()
    body: Partial<Specialty>
  ) {
    const { specialtiesService } = req.container.cradle;
    const specialtyUpdated = await specialtiesService.update(id, body);

    return {
      specialty: specialtyUpdated,
    };
  }

  @Delete("/:id")
  async deleteSpecialty(@Param("id") id: string, @Req() req: MyRequest) {
    const { specialtiesService } = req.container.cradle;
    const specialtyDeleted = await specialtiesService.delete(id);

    return {
      specialty: specialtyDeleted,
    };
  }
}
