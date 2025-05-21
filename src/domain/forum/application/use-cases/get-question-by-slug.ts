import { UniqueEntitiesID } from "@/core/entities/unique-entities-id"
import { QuestionRepositories } from "../repositories/question-repositories"
import { Question } from "../../enterprise/entities/question"
import { left, right, type Either } from "@/core/types/either"
import { ResourceNotFoundError } from "./errors/resource-not-found.error"


interface GetQuestionBySlugUseCaseRequest {
  slug: string
}

type GetQuestionBySlugUseCaseResponse = Either<
  ResourceNotFoundError,
  {
    question: Question
  }
>

export class GetQuestionBySlugUseCase {
  constructor(private questionRepositories: QuestionRepositories) {}

  async execute({
    slug
  }: GetQuestionBySlugUseCaseRequest): Promise<GetQuestionBySlugUseCaseResponse> {
    
    const question = await this.questionRepositories.findBySlug(slug)

    if(!question) {
      return left(new ResourceNotFoundError())
    }

    return right({question})
  }
}
