import { AnswerRepositories } from "../repositories/answer-repositories"


interface DeleteAnswerUseCaseRequest {
  answerId: string
  authorId: string
}

interface DeleteAnswerUseCaseResponse {}

export class DeleteAnswerUseCase {
  constructor(private answerRepositories: AnswerRepositories) {}

  async create({
    authorId,
    answerId
  }: DeleteAnswerUseCaseRequest): Promise<DeleteAnswerUseCaseResponse> {

    const answer = await this.answerRepositories.findById(answerId)

    if(!answer) {
      throw new Error("answer not found.")
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("You are not the author of this answer.")
    }
 
    await this.answerRepositories.delete(answer)

    return {}
  }
}
