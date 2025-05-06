import { UniqueEntitiesID } from "@/core/entities/unique-entities-id"
import { QuestionRepositories } from "../repositories/question-repositories"
import { Question } from "../../enterprise/entities/question"


interface FetchRecentQuestionUseCaseRequest {
  page: number,
}

interface FetchRecentQuestionUseCaseResponse {
  questions: Question[]
}

export class FetchRecentQuestionUseCase {
  constructor(private questionRepositories: QuestionRepositories) {}

  async create({
    page
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionUseCaseResponse> {
    
    const questions = await this.questionRepositories.findManyRecent({page})

    return {questions}
  }
}
