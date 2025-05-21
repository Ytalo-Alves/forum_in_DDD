import { left, right, type Either } from "@/core/types/either";
import type { Answer } from "../../enterprise/entities/answer";
import { AnswerRepositories } from "../repositories/answer-repositories";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface EditAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
  content: string;
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(private answerRepositories: AnswerRepositories) {}

  async create({
    authorId,
    answerId,
    content,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepositories.findById(answerId);

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    answer.content = content;

    await this.answerRepositories.save(answer);

    return right({ answer })
  }
}
