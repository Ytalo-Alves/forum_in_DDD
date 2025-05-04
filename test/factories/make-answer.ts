import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { Answer, AnswerProps } from "@/domain/forum/enterprise/entities/answer";
import { Slug } from "@/domain/forum/enterprise/entities/value-object/slug";
import { faker } from "@faker-js/faker";

export function makeAnswer(

  override: Partial<AnswerProps> = {},
  id?: UniqueEntitiesID,

) {
  const answer = Answer.create({
    authorId: new UniqueEntitiesID(),
    questionId: new UniqueEntitiesID(),
    content: faker.lorem.text(),
    ...override,
  }, id);

  return answer

}