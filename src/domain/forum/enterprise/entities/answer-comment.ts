import { Optional } from "@/core/entities/types/optional";
import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { Comment, type CommentProps } from "./comment";

export interface answerCommentProps extends CommentProps {
  answerId: UniqueEntitiesID,
}

export class AnswerComment extends Comment<answerCommentProps> {

  get answerId() {
    return this.props.answerId
  }
 
  static create (
    props: Optional<answerCommentProps, 'createdAt'>,
    id?: UniqueEntitiesID
  ) {
    const answerComment = new AnswerComment({
      ...props,
      createdAt: props.createdAt ?? new Date()
    },
    id
  )

  return answerComment
  }
}
