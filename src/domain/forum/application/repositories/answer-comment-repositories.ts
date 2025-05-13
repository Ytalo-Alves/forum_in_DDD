import type { AnswerComment } from "../../enterprise/entities/answer-comment";

export interface AnswerCommentRepositories {
  create(answerComment: AnswerComment): Promise<void>
  findById(id: string): Promise<AnswerComment | null>
  delete(answerComment: AnswerComment): Promise<void>
}