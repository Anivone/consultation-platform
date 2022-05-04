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
import { MyRequest } from "../../config/AwilixContainer";
import { Consultation } from "../../domain/entities/Consultation";

@JsonController("/consultations")
export class ConsultationsController {
    @Get()
    async getConsultations(@Req() req: MyRequest) {
        const { consultationsService } = req.container.cradle;
        const consultations = await consultationsService.get();

        return {
            consultations,
        };
    }

    @Get("/:id")
    async getComment(@Param("id") id: string, @Req() req: MyRequest) {
        const { consultationsService } = req.container.cradle;
        const consultationFound = await consultationsService.getById(id);

        return {
            consultation: consultationFound,
        };
    }

    @Post()
    async createComment(@Req() req: MyRequest, @Body() body: Consultation) {
        const { consultationsService } = req.container.cradle;
        const newComment = await consultationsService.create(body);

        return {
            consultation: newComment,
        };
    }

    @Patch("/:id")
    async updateComment(
        @Param("id") id: string,
        @Req() req: MyRequest,
        @Body() body: Partial<Consultation>
    ) {
        const { consultationsService } = req.container.cradle;
        const consultationUpdated = await consultationsService.update(id, body);

        return {
            consultation: consultationUpdated,
        };
    }

    @Delete("/:id")
    async deleteComment(@Param("id") id: string, @Req() req: MyRequest) {
        const { consultationsService } = req.container.cradle;
        const consultationDeleted = await consultationsService.delete(id);

        return {
            consultation: consultationDeleted,
        };
    }
}
