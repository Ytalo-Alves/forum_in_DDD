import { Answer } from "../../enterprise/entities/answer";


export interface AnswerRepositories {
  create(answer: Answer): Promise<void>
  findById(answerId: string): Promise<Answer | null>
  delete(answer: Answer): Promise<void>
  save(answer: Answer): Promise<void>
}
