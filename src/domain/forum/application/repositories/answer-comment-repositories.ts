import type { PageParams } from "@/core/repositories/page-params";
import type { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentRepositories {
  create(answerComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  delete(answerComment: AnswerComment): Promise<void>
  findManyByAnswerId(answerId: string, params: PageParams): Promise<AnswerComment[]>
}