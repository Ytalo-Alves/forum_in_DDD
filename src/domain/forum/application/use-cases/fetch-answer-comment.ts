import { right, Either } from "@/core/types/either";
import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentRepositories } from "../repositories/answer-comment-repositories";

interface FetchAnswerCommentUseCaseRequest {
  answerId: string;
  page: number;
}

type FetchAnswerCommentUseCaseResponse = Either<
  null,
  {
    answerComments: AnswerComment[]
  }
>

export class FetchAnswerCommentUseCase {
  constructor(private fetchAnswerRepository: AnswerCommentRepositories) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentUseCaseRequest): Promise<FetchAnswerCommentUseCaseResponse> {
    const answerComments = await this.fetchAnswerRepository.findManyByAnswerId(
      answerId,
      { page }
    );

    return right({ answerComments })
  }
}
