import { Entity } from "@/core/entities/entity";
import type { UniqueEntitiesID } from "@/core/entities/unique-entities-id";

export interface QuestionAttachmentProps {
  questionId: UniqueEntitiesID;
  attachmentId: UniqueEntitiesID;
}

export class QuestionAttachment extends Entity<QuestionAttachmentProps> {
  get questionId() {
    return this.props.questionId
  }

  get attachmentId() {
    return this.props.attachmentId
  }

  static create(props: QuestionAttachmentProps, id?: UniqueEntitiesID) {
    const attachment = new QuestionAttachment(props, id)

    return attachment
  }
}