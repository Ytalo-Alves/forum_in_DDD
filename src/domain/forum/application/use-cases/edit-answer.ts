import type { Answer } from "../../enterprise/entities/answer";
import { AnswerRepositories } from "../repositories/answer-repositories";

interface EditAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
  content: string;
}

interface EditAnswerUseCaseResponse {
  answer: Answer;
}

export class EditAnswerUseCase {
  constructor(private answerRepositories: AnswerRepositories) {}

  async create({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepositories.findById(answerId);

    if (!answer) {
      throw new Error("answer not found.");
    }

    if (authorId !== answer.authorId.toString()) {
      throw new Error("You are not the author of this answer.");
    }

    answer.content = content;

    await this.answerRepositories.save(answer);

    return { answer };
  }
}
