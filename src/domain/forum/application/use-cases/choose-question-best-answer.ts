import { Either, left, right } from "@/core/types/either";
import { Question } from "../../enterprise/entities/question";
import { AnswerRepositories } from "../repositories/answer-repositories";
import { QuestionRepositories } from "../repositories/question-repositories";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { NotAllowedError } from "./errors/not-allowed-error";

interface ChooseQuestionBestUseCaseRequest {
  answerId: string;
  authorId: string;
}

type ChooseQuestionBestUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question;
  }
>;

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
      return left(new ResourceNotFoundError());
    }

    const question = await this.questionRepositories.findById(
      answer.questionId.toString()
    );

    if (!question) {
      return left(new ResourceNotFoundError());
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError());
    }

    question.bestAnswerId = answer.id;

    await this.questionRepositories.save(question);

    return right({
      question,
    });
  }
}
