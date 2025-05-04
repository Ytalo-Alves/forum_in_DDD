import { UniqueEntitiesID } from "@/core/entities/unique-entities-id"
import { QuestionRepositories } from "../repositories/question-repositories"
import { Question } from "../../enterprise/entities/question"


interface CreateQuestionUseCaseRequest {
  authorId: string
  title: string
  content: string
}

interface CreateQuestionUseCaseResponse {
  question: Question
}

export class CreateQuestionUseCase {
  constructor(private questionRepositories: QuestionRepositories) {}

  async create({
    authorId,
    title,
    content
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntitiesID(authorId),
      title,
      content
    })

    await this.questionRepositories.create(question)

    return {question}
  }
}
