import { Entity } from "@/core/entities/entity";
import type { UniqueEntitiesID } from "@/core/entities/unique-entities-id";

export interface AnswerAttachmentProps {
  answerId: UniqueEntitiesID;
  attachmentId: UniqueEntitiesID;
}

export class AnswerAttachment extends Entity<AnswerAttachmentProps> {
  get answerId() {
    return this.props.answerId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: AnswerAttachmentProps, id?: UniqueEntitiesID) {
    const answerAttachment = new AnswerAttachment(props, id)

    return answerAttachment
  }
}