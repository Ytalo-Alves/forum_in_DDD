import { Entity } from "@/core/entities/entity";
import { Optional } from "@/core/entities/types/optional";
import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";

export interface CommentProps {
  authorId: UniqueEntitiesID,
  content: string,
  createdAt: Date,
  updatedAt?: Date 
}

export abstract class Comment<Props extends CommentProps> extends Entity<Props> {
  get authorId() {
    return this.props.authorId
  }

  get content() {
    return this.props.content
  }

  get createdAt() {
    return this.props.createdAt
  }

  get updatedAt() {
    return this.props.updatedAt
  }

  private touch() {
    return this.props.updatedAt = new Date()
  }

  set content(content: string){
    this.props.content = content
    this.touch()
  }

}