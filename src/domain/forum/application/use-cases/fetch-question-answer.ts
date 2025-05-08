import type { Answer } from "../../enterprise/entities/answer"
import { AnswerRepositories } from "../repositories/answer-repositories"


interface FetchQuestionAnswerUseCaseRequest {
  page: number,
  questionId: string
}

interface FetchQuestionAnswerUseCaseResponse {
  answers: Answer[]
}

export class FetchQuestionAnswerUseCase {
  constructor(private answerRepositories: AnswerRepositories) {}

  async create({
    page,
    questionId
  }: FetchQuestionAnswerUseCaseRequest): Promise<FetchQuestionAnswerUseCaseResponse> {
    
    const answers = await this.answerRepositories.findManyByQuestionId(questionId, {page})

    return {answers}
  }
}
