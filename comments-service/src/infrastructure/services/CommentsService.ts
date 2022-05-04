import { CommentsRepository } from "../../data/repositories/CommentsRepository";
import { Service } from "./Service";
import { CommentProps } from "../../domain/entities/types";
import { Comment } from "../../domain/entities/Comment";

interface CommentsServiceProps {
  commentsRepository: CommentsRepository;
}

export class CommentsService implements Service<Comment, CommentProps> {
  private commentsRepository: CommentsRepository;

  constructor({ commentsRepository }: CommentsServiceProps) {
    this.commentsRepository = commentsRepository;
  }

  async create(props: CommentProps): Promise<Comment> {
    const newComment = await this.commentsRepository.create(
      Comment.build(props)
    );

    return newComment;
  }

  async delete(id: string): Promise<Comment | null> {
    const commentDeleted = await this.commentsRepository.delete(id);
    if (!commentDeleted) return null;

    return commentDeleted;
  }

  async get(filter?: Partial<CommentProps>): Promise<Comment[]> {
    const comments = await this.commentsRepository.getAll(filter);

    return comments;
  }

  async getById(id: string): Promise<Comment | null> {
    const commentFound = await this.commentsRepository.getById(id);
    if (!commentFound) return null;

    return commentFound;
  }

  async getOne(filter: Partial<CommentProps>): Promise<Comment | null> {
    const commentFound = await this.commentsRepository.getOne(filter);
    if (!commentFound) return null;

    return commentFound;
  }

  async update(
    id: string,
    props: Partial<CommentProps>
  ): Promise<Comment | null> {
    const commentUpdated = await this.commentsRepository.update(id, props);
    if (!commentUpdated) return null;

    return commentUpdated;
  }
}
