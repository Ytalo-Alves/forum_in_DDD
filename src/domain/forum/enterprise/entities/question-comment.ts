import { Optional } from "@/core/entities/types/optional";
import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { Comment, type CommentProps } from "./comment";

export interface QuestionCommentProps extends CommentProps {
  questionId: UniqueEntitiesID,
}

export class QuestionComment extends Comment<QuestionCommentProps> {

  get questionId() {
    return this.props.questionId
  }

  static create(
    props: Optional<QuestionCommentProps, 'createdAt'>,
    id?: UniqueEntitiesID
  ) {
    const questionComment = new QuestionComment({
      ...props,
      createdAt: props.createdAt ?? new Date(),
    }, id)

    return questionComment
  }
}