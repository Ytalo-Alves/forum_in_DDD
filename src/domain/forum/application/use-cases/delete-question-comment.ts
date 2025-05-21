import { Either, left, right } from "@/core/types/either";
import { QuestionCommentRepositories } from "../repositories/question-comment-repositories";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

type DeleteQuestionCommentUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentRepositories : QuestionCommentRepositories
  ) {}

  async execute({
    authorId,
    questionCommentId
  }: DeleteQuestionCommentUseCaseRequest) : Promise<DeleteQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentRepositories.findById(questionCommentId)

    if(!questionComment) {
      return left(new ResourceNotFoundError())
    }

    if(questionComment.authorId.toString() !== authorId){
      return left(new NotAllowedError())
    }

    await this.questionCommentRepositories.delete(questionComment)

    return right({})
  }
}