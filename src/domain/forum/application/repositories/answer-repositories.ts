import type { PageParams } from "@/core/repositories/page-params";
import { Answer } from "../../enterprise/entities/answer";


export interface AnswerRepositories {
  create(answer: Answer): Promise<void>
  findById(answerId: string): Promise<Answer | null>
  delete(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
  findManyByQuestionId(questionId: string, params: PageParams) : Promise<Answer[]>
}
