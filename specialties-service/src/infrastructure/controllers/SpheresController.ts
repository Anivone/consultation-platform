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
import { Sphere } from "../../domain/entities/Sphere";
import { MyRequest } from "../../config/AwilixContainer";

@JsonController("/spheres")
export class SpheresController {
  @Get()
  async getSpheres(@Req() req: MyRequest) {
    const { spheresService } = req.container.cradle;
    const spheres = await spheresService.get();

    return {
      spheres,
    };
  }

  @Get("/:id")
  async getSphere(@Param("id") id: string, @Req() req: MyRequest) {
    const { spheresService } = req.container.cradle;
    console.log("id", id);
    const sphereFound = await spheresService.getById(id);
    console.log("sphereFound: ", sphereFound);

    return {
      sphere: sphereFound,
    };
  }

  @Post()
  async createSphere(
    @Req()
    req: MyRequest,
    @Body()
    body: Sphere
  ) {
    const { spheresService } = req.container.cradle;
    const newSphere = await spheresService.create(body);

    return {
      sphere: newSphere,
    };
  }

  @Patch("/:id")
  async updateSphere(
    @Param("id")
    id: string,
    @Req()
    req: MyRequest,
    @Body()
    body: Partial<Sphere>
  ) {
    const { spheresService } = req.container.cradle;
    const sphereUpdated = await spheresService.update(id, body);

    return {
      sphere: sphereUpdated,
    };
  }

  @Delete("/:id")
  async deleteSphere(@Param("id") id: string, @Req() req: MyRequest) {
    const { spheresService } = req.container.cradle;
    const sphereDeleted = await spheresService.delete(id);

    return {
      sphere: sphereDeleted,
    };
  }
}
