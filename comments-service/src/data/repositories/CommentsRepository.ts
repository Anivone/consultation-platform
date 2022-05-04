import { Repository } from "./Repository";
import { CommentProps } from "../../domain/entities/types";
import { Comment } from "../../domain/entities/Comment";
import CommentModel, { CommentMod } from "../schemas/CommentSchema";

interface CommentRepositoryProps {
  CommentModel: CommentMod;
}

export class CommentsRepository implements Repository<Comment, CommentProps> {
  private CommentModel: CommentMod;

  constructor({ CommentModel }: CommentRepositoryProps) {
    this.CommentModel = CommentModel;
  }

  async create(props: CommentProps): Promise<Comment> {
    const newComment = CommentModel.build(props);
    await newComment.save();

    return Comment.build(newComment);
  }

  async delete(id: string): Promise<Comment | null> {
    const commentDeleted = await this.CommentModel.findByIdAndDelete(id);
    if (!commentDeleted) return null;

    return Comment.build(commentDeleted);
  }

  async getAll(filter?: Partial<CommentProps>): Promise<Comment[]> {
    const comments = await this.CommentModel.find({ ...filter });

    return comments.map((comment) => Comment.build(comment));
  }

  async getById(id: string): Promise<Comment | null> {
    const commentFound = await this.CommentModel.findById(id);
    if (!commentFound) return null;

    return Comment.build(commentFound);
  }

  async getOne(filter: Partial<CommentProps>): Promise<Comment | null> {
    const commentFound = await this.CommentModel.findOne(filter);
    if (!commentFound) return null;

    return Comment.build(commentFound);
  }

  async update(
    id: string,
    props: Partial<CommentProps>
  ): Promise<Comment | null> {
    const commentUpdated = await this.CommentModel.findByIdAndUpdate(id, props);
    if (!commentUpdated) return null;

    return Comment.build(commentUpdated);
  }
}
