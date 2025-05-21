import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { QuestionRepositories } from "../repositories/question-repositories";
import { Question } from "../../enterprise/entities/question";
import { right, type Either } from "@/core/types/either";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionRepositories: QuestionRepositories) {}

  async execute({
    authorId,
    title,
    content,
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {
    const question = Question.create({
      authorId: new UniqueEntitiesID(authorId),
      title,
      content,
    });

    await this.questionRepositories.create(question);

    return right({ question });
  }
}
