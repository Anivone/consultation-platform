import { Get, JsonController, Req, UseBefore } from "routing-controllers";
import { currentUser } from "../middlewares/CurrentUser";
import { MyRequest } from "../../config/AwilixContainer";

@JsonController("/recommendations")
export class RecommendationsController {

  @UseBefore(currentUser)
  @Get('/content-based')
  async contentBasedRecommendations(@Req() req: MyRequest) {
    const { recommendationsService } = req.container.cradle;

    if (!req.currentUser?.id) {
      throw new Error('User must be logged in')
    }
    const recommendedPosts = await recommendationsService.contentBased(
      req.currentUser?.id!
    );

    return {
      recommendedPosts,
    };
  }

  @UseBefore(currentUser)
  @Get('/collaborative')
  async collaborativeRecommendations(@Req() req: MyRequest) {
    const { recommendationsService } = req.container.cradle;

    if (!req.currentUser?.id) {
      throw new Error('User must be logged in')
    }
    const recommendedPosts = await recommendationsService.collaborative(
        req.currentUser.id
    );

    return {
      recommendedPosts,
    };
  }
}
