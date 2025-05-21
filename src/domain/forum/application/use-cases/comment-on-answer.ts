import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import type { AnswerCommentRepositories } from "../repositories/answer-comment-repositories";
import type { AnswerRepositories } from "../repositories/answer-repositories";
import { left, right, type Either } from "@/core/types/either";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";

interface CommentOnAnswerUseCaseRequest {
  authorId: string;
  answerId: string;
  content: string;
}

type CommentOnAnswerUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    answerComment: AnswerComment;
  }
>;

export class CommentOnAnswerUseCase {
  constructor(
    private answerRepositories: AnswerRepositories,
    private answerCommentRepositories: AnswerCommentRepositories
  ) {}

  async execute({
    authorId,
    answerId,
    content,
  }: CommentOnAnswerUseCaseRequest): Promise<CommentOnAnswerUseCaseResponse> {
    const answer = await this.answerRepositories.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError());
    }

    const answerComment = AnswerComment.create({
      authorId: new UniqueEntitiesID(authorId),
      answerId: new UniqueEntitiesID(answerId),
      content,
    });

    await this.answerCommentRepositories.create(answerComment);

    return right({
      answerComment,
    });
  }
}
