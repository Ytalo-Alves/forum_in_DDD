import type { PageParams } from "@/core/repositories/page-params";
import type { QuestionComment } from "../../enterprise/entities/question-comment";

export interface QuestionCommentRepositories {
  create(questionComment: QuestionComment): Promise<void>
  findById(id: string): Promise<QuestionComment | null>
  delete(questionComment: QuestionComment): Promise<void>
  findManyByQuestionId(questionId: string, params: PageParams) : Promise<QuestionComment[]>
}