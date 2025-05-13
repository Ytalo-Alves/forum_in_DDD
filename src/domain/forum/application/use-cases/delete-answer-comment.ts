import { left, right, type Either } from "@/core/types/either";
import type { InMemoryAnswerCommentRepositories } from "test/repositories/In-memory-answer-comment-repositories";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

type DeleteAnswerCommentUseCaseResponse = Either<ResourceNotFoundError | NotAllowedError, {}>

export class DeleteAnswerCommentUseCase {
  constructor(
    private answerCommentRepositories: InMemoryAnswerCommentRepositories
  ) {}

  async execute({
    authorId,
    answerCommentId
  }: DeleteAnswerCommentUseCaseRequest) : Promise<DeleteAnswerCommentUseCaseResponse>{
    const answerComment = await this.answerCommentRepositories.findById(answerCommentId)

    if(!answerComment){
      return left(new ResourceNotFoundError())
    }

    if(answerComment.authorId.toString() !== authorId) {
      return left(new NotAllowedError())
    }

    await this.answerCommentRepositories.delete(answerComment)

    return right({})
  }
}