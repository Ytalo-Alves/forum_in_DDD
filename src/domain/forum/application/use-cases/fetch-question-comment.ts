import type { QuestionComment } from "../../enterprise/entities/question-comment";
import type { QuestionCommentRepositories } from "../repositories/question-comment-repositories";

interface FetchQuestionCommentUseCaseRequest {
  questionId: string;
  page: number
}

interface FetchQuestionCommentUseCaseResponse {
  questionComment: QuestionComment[]
}

export class FetchQuestionCommentUseCase {
  constructor(
    private questionCommentRepositories: QuestionCommentRepositories
  ) {}

  async execute({
    questionId,
    page
  }: FetchQuestionCommentUseCaseRequest) : Promise<FetchQuestionCommentUseCaseResponse> {
    const questionComment = await this.questionCommentRepositories.findManyByQuestionId(questionId, {page})

    return {questionComment}
  }
}