import { AnswerComment } from "../../enterprise/entities/answer-comment";
import { AnswerCommentRepositories } from "../repositories/answer-comment-repositories";

interface FetchAnswerCommentUseCaseRequest {
  answerId: string;
  page: number;
}

interface FetchAnswerCommentUseCaseResponse {
  answerComment: AnswerComment[];
}

export class FetchAnswerCommentUseCase {
  constructor(private fetchAnswerRepository: AnswerCommentRepositories) {}

  async execute({
    answerId,
    page,
  }: FetchAnswerCommentUseCaseRequest): Promise<FetchAnswerCommentUseCaseResponse> {
    const answerComment = await this.fetchAnswerRepository.findManyByAnswerId(
      answerId,
      { page }
    );

    return { answerComment };
  }
}
