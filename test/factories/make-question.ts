import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { Question, QuestionProps } from "@/domain/forum/enterprise/entities/question";
import { Slug } from "@/domain/forum/enterprise/entities/value-object/slug";
import { faker } from "@faker-js/faker";

export function makeQuestion(

  override: Partial<QuestionProps> = {},
  id?: UniqueEntitiesID,

) {
  const question = Question.create({
    authorId: new UniqueEntitiesID(),
    title: faker.lorem.sentence(),
    content: faker.lorem.text(),
    slug: Slug.create("o-que-e-o-typescript"),
    ...override,
  }, id);

  return question

}