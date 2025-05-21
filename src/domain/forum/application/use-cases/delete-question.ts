import { left, right, type Either } from "@/core/types/either"
import { QuestionRepositories } from "../repositories/question-repositories"
import { ResourceNotFoundError } from "./errors/resource-not-found.error"
import { NotAllowedError } from "./errors/not-allowed-error"


interface DeleteQuestionUseCaseRequest {
  questionId: string
  authorId: string
}

type DeleteQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {}
>

export class DeleteQuestionUseCase {
  constructor(private questionRepositories: QuestionRepositories) {}

  async create({
    authorId,
    questionId
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {

    const question = await this.questionRepositories.findById(questionId)

    if(!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }
 
    await this.questionRepositories.delete(question)

    return right({})
  }
}
