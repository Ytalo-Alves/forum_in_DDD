import { left, right, type Either } from "@/core/types/either"
import type { Question } from "../../enterprise/entities/question"
import { QuestionRepositories } from "../repositories/question-repositories"
import { ResourceNotFoundError } from "./errors/resource-not-found.error"
import { NotAllowedError } from "./errors/not-allowed-error"


interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(private questionRepositories: QuestionRepositories) {}

  async create({
    authorId,
    questionId,
    title,
    content,
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {

    const question = await this.questionRepositories.findById(questionId)

    if(!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    question.title = title
    question.content = content
 
    await this.questionRepositories.save(question)

    return right({question})
  }
}
