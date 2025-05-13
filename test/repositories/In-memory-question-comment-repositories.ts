import type { PageParams } from "@/core/repositories/page-params";
import type { QuestionCommentRepositories } from "@/domain/forum/application/repositories/question-comment-repositories";
import type { QuestionComment } from "@/domain/forum/enterprise/entities/question-comment";

export class InMemoryQuestionCommentRepositories implements QuestionCommentRepositories{
  
  public items: QuestionComment[] = []

  async findManyByQuestionId(questionId: string, {page}: PageParams) {
    const questionComment = this.items.filter((item) => item.questionId.toString() === questionId)
    .slice((page - 1) * 20, page * 20)

    return questionComment
  }

  async findById(id:string){
    const questionComment = this.items.find((item) => item.id.toString() === id)

    if(!questionComment) {
      return null
    }

    return questionComment
  }

  async delete(questionComment: QuestionComment) {
    const itemIndex = this.items.findIndex((item) => item.id === questionComment.id)

    this.items.splice(itemIndex, 1)
  }

  async create(questionComment: QuestionComment){
    this.items.push(questionComment)
  }

}