import { Answer } from "../../enterprise/entities/answer";
import type { Question } from "../../enterprise/entities/question";
import { AnswerRepositories } from "../repositories/answer-repositories";
import { QuestionRepositories } from "../repositories/question-repositories";

interface ChooseQuestionBestUseCaseRequest {
  answerId: string;
  authorId: string;
}

interface ChooseQuestionBestUseCaseResponse {
  question: Question;
}

export class ChooseQuestionBestUseCase {
  constructor(
    private questionRepositories: QuestionRepositories,
    private answerRepositories: AnswerRepositories
  ) {}

  async execute({
    answerId,
    authorId,
  }: ChooseQuestionBestUseCaseRequest): Promise<ChooseQuestionBestUseCaseResponse> {
    const answer = await this.answerRepositories.findById(answerId);

    if (!answer) {
      throw new Error("Answer not found.");
    }

    const question = await this.questionRepositories.findById(
      answer.questionId.toString()
    );

    if (!question) {
      throw new Error("Question not found.");
    }

    if(authorId !== question.authorId.toString()) {
      throw new Error ('Not allowed')
    }

    question.bestAnswerId = answer.id

    await this.questionRepositories.save(question)

    return {
      question,
    }

  }
}
