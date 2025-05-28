import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { QuestionAttachment, QuestionAttachmentProps } from "@/domain/forum/enterprise/entities/question-attachment";

export function makeQuestionAttachment(
  override: Partial<QuestionAttachmentProps> = {},
  id?:UniqueEntitiesID,
) {
  const questionAttachment = QuestionAttachment.create({
    questionId: new UniqueEntitiesID(),
    attachmentId: new UniqueEntitiesID(),
    ...override
  }, id)

  return questionAttachment
}