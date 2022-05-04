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
import { Post as MyPost } from "../../domain/entities/Post";
import { MyRequest } from "../../config/AwilixContainer";

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

  @Get("/:id")
  async getPost(@Param("id") id: string, @Req() req: MyRequest) {
    const { postsService } = req.container.cradle;
    console.log("id", id);
    const postFound = await postsService.getById(id);
    console.log("postFound: ", postFound);

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
