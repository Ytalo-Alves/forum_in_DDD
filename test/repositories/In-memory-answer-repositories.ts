import { AnswerRepositories } from "@/domain/forum/application/repositories/answer-repositories";
import { Answer } from "@/domain/forum/enterprise/entities/answer";

export class InMemoryAnswerRepositories implements AnswerRepositories {
  public items: Answer[] = []

  async create(answer: Answer) {
    this.items.push(answer)
  }

}