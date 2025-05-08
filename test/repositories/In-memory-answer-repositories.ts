import type { PageParams } from "@/core/repositories/page-params";
import { AnswerRepositories } from "@/domain/forum/application/repositories/answer-repositories";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepositories implements AnswerRepositories {
  
  public items: Answer[] = []

  async findManyByQuestionId(questionId: string, {page}: PageParams) {
    const answers = this.items.filter(item => item.questionId.toString() === questionId)
    .slice((page - 1) * 20, page * 20 )

    return answers
  }

  async save(answer: Answer) {
    const answerIndex = this.items.findIndex(item => item.id === answer.id)

    this.items[answerIndex] = answer
  }

  async findById(id: string) {
    const answer = this.items.find(item => item.id.toString() === id)

    if(!answer) {
      return null
    }
    return answer
  }

  async create(answer: Answer) {
    this.items.push(answer)
  }

  async delete(answer: Answer) {
    const answerIndex = this.items.findIndex(item => item.id === answer.id)

    if(answerIndex >= 0) {
      this.items.splice(answerIndex, 1)
    }
  }

}