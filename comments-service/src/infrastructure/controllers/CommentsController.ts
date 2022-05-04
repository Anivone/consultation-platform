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
import { Comment } from "../../domain/entities/Comment";

@JsonController("/comments")
export class CommentsController {
  @Get()
  async getComments(@Req() req: MyRequest) {
    const { commentsService } = req.container.cradle;
    const comments = await commentsService.get();

    return {
      comments,
    };
  }

  @Get("/:id")
  async getComment(@Param("id") id: string, @Req() req: MyRequest) {
    const { commentsService } = req.container.cradle;
    const commentFound = await commentsService.getById(id);

    return {
      comment: commentFound,
    };
  }

  @Post()
  async createComment(@Req() req: MyRequest, @Body() body: Comment) {
    const { commentsService } = req.container.cradle;
    const newComment = await commentsService.create(body);

    return {
      comment: newComment,
    };
  }

  @Patch("/:id")
  async updateComment(
    @Param("id") id: string,
    @Req() req: MyRequest,
    @Body() body: Partial<Comment>
  ) {
    const { commentsService } = req.container.cradle;
    const commentUpdated = await commentsService.update(id, body);

    return {
      comment: commentUpdated,
    };
  }

  @Delete("/:id")
  async deleteComment(@Param("id") id: string, @Req() req: MyRequest) {
    const { commentsService } = req.container.cradle;
    const commentDeleted = await commentsService.delete(id);

    return {
      comment: commentDeleted,
    };
  }
}
