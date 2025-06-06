import type { PageParams } from "@/core/repositories/page-params";
import { Question } from "../../enterprise/entities/question";

export interface QuestionRepositories {
  findById(id: string): Promise<Question | null>
  create(question: Question): Promise<void>
  findBySlug(slug: string): Promise<Question | null>
  delete(question: Question): Promise<void>
  save(question: Question): Promise<void>
  findManyRecent(params: PageParams): Promise<Question[]>
}
