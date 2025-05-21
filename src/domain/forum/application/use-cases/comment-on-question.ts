import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { QuestionComment } from "../../enterprise/entities/question-comment";
import { QuestionCommentRepositories } from "../repositories/question-comment-repositories";
import { QuestionRepositories } from "../repositories/question-repositories";
import { left, right, type Either } from "@/core/types/either";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";

interface CommentOnQuestionUseCaseRequest {
  authorId: string;
  questionId: string;
  content: string;
}

type CommentOnQuestionUseCaseResponse = Either<
ResourceNotFoundError,
{
  questionComment: QuestionComment
}
>

export class CommentOnQuestionUseCase {
  constructor(
    private questionRepositories: QuestionRepositories,
    private questionCommentRepositories: QuestionCommentRepositories
  ) {}

  async execute({
    authorId,
    questionId,
    content
  }: CommentOnQuestionUseCaseRequest): Promise<CommentOnQuestionUseCaseResponse> {
    const question = await this.questionRepositories.findById(questionId)

    if(!question) {
      return left(new ResourceNotFoundError())
    }

    const questionComment = QuestionComment.create({
      authorId: new UniqueEntitiesID(authorId),
      questionId: new UniqueEntitiesID(questionId),
      content
    })

    await this.questionCommentRepositories.create(questionComment)

    return right(
      {
        questionComment
      }
    )
  }
}