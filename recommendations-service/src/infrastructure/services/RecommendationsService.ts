import UserPostsViewedModel from "../../data/schemas/UserPostsViewedSchema";
import PostModel, { PostDoc } from "../../data/schemas/PostSchema";
import { Post } from "../../domain/entities/Post";
import { Utils } from "../utils/Utils";

export class RecommendationsService {
  readonly COLLABORATIVE_LIMIT = 2;

  async contentBased(userId: string) {
    // Find posts IDs that user has already viewed
    const userPostIdsViewed = await UserPostsViewedModel.findOne({
      userId,
    });
    if (!userPostIdsViewed) {
      throw new Error("No UserPostsViewed found!");
    }
    const userPostsViewed = await PostModel.find({
      _id: {
        $in: userPostIdsViewed.postIds,
      },
    });

    // Find specialties that user is interested in

    const postsPerSpecialtyViewed = Utils.createArrayMapper(
      userPostsViewed,
      "specialty"
    );

    // Sort specialties by most views by the user

    const sortedSpecialtiesByViews = Utils.sortByMostViewed(
      postsPerSpecialtyViewed
    );

    if (!sortedSpecialtiesByViews.length) return [];

    // Find posts that relate to user-liked specialties

    const specialtiesFirstIteration = await PostModel.find({
      specialty: sortedSpecialtiesByViews[0].key,
    });
    const specialtiesSecondIteration =
      sortedSpecialtiesByViews.length > 1
        ? await PostModel.find({
            specialty: sortedSpecialtiesByViews[1].key,
          })
        : [];
    const specialtiesThirdIteration =
      sortedSpecialtiesByViews.length > 2
        ? await PostModel.find({
            specialty: sortedSpecialtiesByViews[2].key,
          })
        : [];

    const viewedPostsBinaryMapper = Utils.createBinaryMapper(userPostsViewed);

    // Filter recommended posts by those that user has already viewed

    const recommendedPosts = specialtiesFirstIteration
      .concat(specialtiesSecondIteration)
      .concat(specialtiesThirdIteration)
      .filter((recPost) => !viewedPostsBinaryMapper[recPost.id]);

    return recommendedPosts.map((post) => Post.build(post));
  }

  async collaborative(userId: string) {
    // Find all posts
    const posts = await PostModel.find({});
    // Create Mapper of post ID to post
    const postsMapper = Utils.createMapper(posts, "id");

    // Create Mapper of users IDs to their posts IDs viewed
    const usersPostsIdsViewed = await UserPostsViewedModel.find({});
    const usersPostsIdsViewedMapper = Utils.createMapperToField(
      usersPostsIdsViewed,
      "userId",
      "postIds"
    );

    // Create Mapper of users IDs to their posts viewed
    const usersPostsViewedMapper = { ...usersPostsIdsViewedMapper };

    Object.keys(usersPostsIdsViewedMapper).forEach((userId) => {
      usersPostsViewedMapper[userId] = usersPostsViewedMapper[userId].map(
        (postId: string) => postsMapper[postId]
      );
    });

    // Create Mapper of users IDs to their specialties viewed
    const usersSpecialtiesMapper = { ...usersPostsViewedMapper };
    Object.keys(usersSpecialtiesMapper).forEach((userId) => {
      const specialtiesWithDuplicates = usersSpecialtiesMapper[userId].map(
        (post: PostDoc) => post.specialty
      );
      usersSpecialtiesMapper[userId] = [...new Set(specialtiesWithDuplicates)];
    });

    // Get current user specialties viewed
    const currentUserSpecialtiesViewed = usersSpecialtiesMapper[userId];

    // Remove current user from Mapper
    delete usersSpecialtiesMapper[userId];

    // Find current user priority of specialties he is interested in
    const currentUserPostsViewed = usersPostsViewedMapper[userId];

    const currentUserSpecialtiesPriorityMapper = {} as {
      [specialty: string]: number;
    };

    const totalUserPostsViewed = currentUserPostsViewed.length;

    currentUserSpecialtiesViewed.forEach((specialty: string) => {
      const specialtyPostsViewedNumber = currentUserPostsViewed.filter(
        (post: PostDoc) => post.specialty === specialty
      ).length;

      currentUserSpecialtiesPriorityMapper[specialty] =
        specialtyPostsViewedNumber / totalUserPostsViewed;
    });

    // Make an array of specialties priority from Mapper
    const currentUserSpecialtiesPriorityArray: {
      specialty: string;
      priority: number;
    }[] = Object.keys(currentUserSpecialtiesPriorityMapper)
      .map((specialty: string) => {
        return {
          specialty,
          priority: currentUserSpecialtiesPriorityMapper[specialty],
        };
      })
      .sort(
        (specialtyPriority1, specialtyPriority2) =>
          specialtyPriority2.priority - specialtyPriority1.priority
      );

    if (!currentUserSpecialtiesPriorityArray.length) return [];

    const usersPriorityMapper = {} as { [userId: string]: number };

    delete usersSpecialtiesMapper[userId];

    Object.keys(usersSpecialtiesMapper).map((otherUserId) => {
      let priority = 0;
      currentUserSpecialtiesPriorityArray.forEach((specialtyPriority) => {
        const specialtyFound = usersSpecialtiesMapper[otherUserId].find(
          (specialty: string) => specialtyPriority.specialty === specialty
        );
        if (specialtyFound) {
          priority += specialtyPriority.priority;
        }
      });
      usersPriorityMapper[otherUserId] = priority;
    });

    const usersPriorityArray = Object.keys(usersPriorityMapper)
      .map((otherUserId) => {
        return {
          userId: otherUserId,
          priority: usersPriorityMapper[otherUserId],
        };
      })
      .sort(
        (userPriority1, userPriority2) =>
          userPriority2.priority - userPriority1.priority
      );

    let recommendedPostsUnfiltered: PostDoc[] = [];

    const iterationMax =
      usersPriorityArray.length > this.COLLABORATIVE_LIMIT
        ? this.COLLABORATIVE_LIMIT
        : usersPriorityArray.length;

    for (let i = 0; i < iterationMax; i++) {
      const posts = usersPostsViewedMapper[usersPriorityArray[i].userId];
      recommendedPostsUnfiltered = recommendedPostsUnfiltered.concat(posts);
    }

    const recommendedPosts = recommendedPostsUnfiltered.filter((post) => {
      return !currentUserPostsViewed.find(
        (currentUserPost: PostDoc) => currentUserPost.id === post.id
      );
    });

    return recommendedPosts.map((post) => Post.build(post));
  }
}
