import { UniqueEntitiesID } from "@/core/entities/unique-entities-id"
import { QuestionRepositories } from "../repositories/question-repositories"
import { Question } from "../../enterprise/entities/question"
import { right, type Either } from "@/core/types/either"


interface FetchRecentQuestionUseCaseRequest {
  page: number,
}

type FetchRecentQuestionsUseCaseResponse = Either<
  null,
  {
    questions: Question[]
  }
>

export class FetchRecentQuestionUseCase {
  constructor(private questionRepositories: QuestionRepositories) {}

  async create({
    page
  }: FetchRecentQuestionUseCaseRequest): Promise<FetchRecentQuestionsUseCaseResponse> {
    
    const questions = await this.questionRepositories.findManyRecent({page})

    return right({questions})
  }
}
