import { QuestionRepositories } from "../repositories/question-repositories"


interface DeleteQuestionUseCaseRequest {
  questionId: string
}

interface DeleteQuestionUseCaseResponse {}

export class DeleteQuestionUseCase {
  constructor(private questionRepositories: QuestionRepositories) {}

  async create({
    questionId
  }: DeleteQuestionUseCaseRequest): Promise<DeleteQuestionUseCaseResponse> {

    const question = await this.questionRepositories.findById(questionId)

    if(!question) {
      throw new Error("Question not found.")
    }
 
    await this.questionRepositories.delete(question)

    return {}
  }
}
