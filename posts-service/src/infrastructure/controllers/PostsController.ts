import {
  Body,
  Delete,
  Get,
  JsonController,
  Param,
  Patch,
  Post,
  Req, UseBefore,
} from "routing-controllers";
import { Post as MyPost } from "../../domain/entities/Post";
import { MyRequest } from "../../config/AwilixContainer";
import {currentUser} from "../middlewares/CurrentUser";

@JsonController("/posts")
export class PostsController {
  @Get()
  async getPosts(@Req() req: MyRequest) {
    const { postsService } = req.container.cradle;
    const posts = await postsService.get();

    return {
      posts,
    };
  }

  @UseBefore(currentUser)
  @Get("/:id")
  async getPost(@Param("id") id: string, @Req() req: MyRequest) {
    const { postsService } = req.container.cradle;
    const postFound = await postsService.getById(id, req.currentUser);

    return {
      post: postFound,
    };
  }

  @Post()
  async createPost(
    @Req()
    req: MyRequest,
    @Body()
    body: MyPost
  ) {
    const { postsService } = req.container.cradle;
    const newPost = await postsService.create(body);

    return {
      post: newPost,
    };
  }

  @Patch("/:id")
  async updatePost(
    @Param("id")
    id: string,
    @Req()
    req: MyRequest,
    @Body()
    body: Partial<MyPost>
  ) {
    const { postsService } = req.container.cradle;
    const postUpdated = await postsService.update(id, body);

    return {
      post: postUpdated,
    };
  }

  @Delete("/:id")
  async deletePost(@Param("id") id: string, @Req() req: MyRequest) {
    const { postsService } = req.container.cradle;
    const postDeleted = await postsService.delete(id);

    return {
      post: postDeleted,
    };
  }
}
