

import { UniqueEntitiesID } from '@/core/entities/unique-entities-id'
import {
  AnswerAttachment,
  AnswerAttachmentProps,
} from '@/domain/forum/enterprise/entities/answer-attachment'

export function makeAnswerAttachment(
  override: Partial<AnswerAttachmentProps> = {},
  id?: UniqueEntitiesID,
) {
  const answerAttachment = AnswerAttachment.create(
    {
      answerId: new UniqueEntitiesID(),
      attachmentId: new UniqueEntitiesID(),
      ...override,
    },
    id,
  )

  return answerAttachment
}