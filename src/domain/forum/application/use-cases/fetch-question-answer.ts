import { right, type Either } from "@/core/types/either"
import type { Answer } from "../../enterprise/entities/answer"
import { AnswerRepositories } from "../repositories/answer-repositories"


interface FetchQuestionAnswerUseCaseRequest {
  page: number,
  questionId: string
}

type FetchQuestionAnswersUseCaseResponse = Either<
  null,
  {
    answers: Answer[]
  }
>

export class FetchQuestionAnswerUseCase {
  constructor(private answerRepositories: AnswerRepositories) {}

  async create({
    page,
    questionId
  }: FetchQuestionAnswerUseCaseRequest): Promise<FetchQuestionAnswersUseCaseResponse> {
    
    const answers = await this.answerRepositories.findManyByQuestionId(questionId, {page})

    return right({answers})
  }
}
