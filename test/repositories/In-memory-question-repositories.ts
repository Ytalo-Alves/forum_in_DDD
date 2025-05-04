import { QuestionRepositories } from "@/domain/forum/application/repositories/question-repositories";
import { Question } from "@/domain/forum/enterprise/entities/question";

export class InMemoryQuestionRepositories implements QuestionRepositories {
  
  public items: Question[] = [];

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
