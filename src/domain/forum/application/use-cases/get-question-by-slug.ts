import { UniqueEntitiesID } from "@/core/entities/unique-entities-id"
import { QuestionRepositories } from "../repositories/question-repositories"
import { Question } from "../../enterprise/entities/question"


interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

interface GetQuestionBySlugUseCaseResponse {
  question: Question
}

export class GetQuestionBySlugUseCase {
  constructor(private questionRepositories: QuestionRepositories) {}

  async create({
    slug
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    
    const question = await this.questionRepositories.findBySlug(slug)

    if(!question) {
      throw new Error("Question not found.")
    }

    return {question}
  }
}
