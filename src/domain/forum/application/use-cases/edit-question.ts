import type { Question } from "../../enterprise/entities/question"
import { QuestionRepositories } from "../repositories/question-repositories"


interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
}

interface EditQuestionUseCaseResponse {
  question: Question
}

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
      throw new Error("Question not found.")
    }

    if (authorId !== question.authorId.toString()) {
      throw new Error("You are not the author of this question.")
    }

    question.title = title
    question.content = content
 
    await this.questionRepositories.save(question)

    return {question}
  }
}
