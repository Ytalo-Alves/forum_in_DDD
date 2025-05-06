import type { PageParams } from "@/core/repositories/page-params";
import { QuestionRepositories } from "@/domain/forum/application/repositories/question-repositories";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepositories implements QuestionRepositories {
 
  public items: Question[] = [];

  async findManyRecent({page}: PageParams) {
    const questions = this.items.sort((a, b)=> b.createdAt.getTime() - a.createdAt.getTime())
    .slice((page -1) * 20, page * 20 )

    return questions

  }

  async save(question: Question) {
    const questionIndex = this.items.findIndex(item => item.id === question.id)
    this.items[questionIndex] = question
  
  }

  async findById(id: string){
    const question = this.items.find(item => item.id.toString() === id)
    if(!question) {
      return null
    }
    return question
  }

  async findBySlug(slug: string){
    const question = this.items.find(item =>  item.slug.value === slug)
    
    if(!question) {
      return null
    }
    
    return question
  }

  async create(question: Question) {
    this.items.push(question);
  }
  
  async delete(question: Question) {
    const questionIndex = this.items.findIndex(item => item.id === question.id)

    if(questionIndex >= 0) {
      this.items.splice(questionIndex, 1)
    }
  }
}
