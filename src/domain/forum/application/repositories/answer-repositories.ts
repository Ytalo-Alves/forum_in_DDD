import { Answer } from "../../enterprise/entities/answer";


export interface AnswerRepositories {
  create(answer: Answer): Promise<void>
}
