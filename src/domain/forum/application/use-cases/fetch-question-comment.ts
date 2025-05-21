import { right, type Either } from "@/core/types/either";
import type { QuestionComment } from "../../enterprise/entities/question-comment";
import type { QuestionCommentRepositories } from "../repositories/question-comment-repositories";

interface FetchQuestionCommentUseCaseRequest {
  questionId: string;
  page: number
}

type FetchQuestionCommentsUseCaseResponse = Either<
  null,
  {
    questionComments: QuestionComment[]
  }
>

export class FetchQuestionCommentUseCase {
  constructor(
    private questionCommentRepositories: QuestionCommentRepositories
  ) {}

  async execute({
    questionId,
    page
  }: FetchQuestionCommentUseCaseRequest) : Promise<FetchQuestionCommentsUseCaseResponse> {
    const questionComments = await this.questionCommentRepositories.findManyByQuestionId(questionId, {page})

    return right({questionComments})
  }
}