import { left, right, type Either } from "@/core/types/either"
import { AnswerRepositories } from "../repositories/answer-repositories"
import { ResourceNotFoundError } from "./errors/resource-not-found.error"
import { NotAllowedError } from "./errors/not-allowed-error"


interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

type DeleteAnswerUseCaseResponse = Either< ResourceNotFoundError | NotAllowedError,{}>

export class DeleteAnswerUseCase {
  constructor(private answerRepositories: AnswerRepositories) {}

  async create({
    authorId,
    answerId
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {

    const answer = await this.answerRepositories.findById(answerId)

    if(!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }
 
    await this.answerRepositories.delete(answer)

    return right({})
  }
}
