import type { PageParams } from "@/core/repositories/page-params";
import type { AnswerCommentRepositories } from "@/domain/forum/application/repositories/answer-comment-repositories";
import type { AnswerComment } from "@/domain/forum/enterprise/entities/answer-comment";

export class InMemoryAnswerCommentRepositories implements AnswerCommentRepositories {
  
  public itens : AnswerComment[] = []

  async findManyByAnswerId(answerId: string, {page}: PageParams) {
    const answerComment = await this.itens
    .filter((item) => item.answerId.toString() === answerId)
    .slice((page - 1) * 20, page * 20)
    

    return answerComment
  }
  
  async findById(id: string) {
    const answerComment = this.itens.find((item) => item.id.toString() === id)

    if(!answerComment) {
      return null
    }

    return answerComment
  }
  async delete(answerComment: AnswerComment) {
    const itemIndex = this.itens.findIndex((item) => item.id === answerComment.id)

    this.itens.splice(itemIndex, 1)
  }

  async create(answerComment: AnswerComment){
    this.itens.push(answerComment)
  }

}