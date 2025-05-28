import { QuestionAttachment } from "../../enterprise/entities/question-attachment";

export interface QuestionAttachmentRepositories {
  findManyByQuestionId(questionId: string): Promise<QuestionAttachment[]>
  deleteManyByQuestionId(questionId: string): Promise<void>
}