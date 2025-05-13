import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { QuestionComment, type QuestionCommentProps } from "@/domain/forum/enterprise/entities/question-comment";
import { faker } from "@faker-js/faker";

export function makeQuestionComment(
  override: Partial<QuestionCommentProps> = {},
  id?:UniqueEntitiesID,
) {
  const question = QuestionComment.create({
    authorId: new UniqueEntitiesID(),
    questionId: new UniqueEntitiesID(),
    content: faker.lorem.text(),
    ...override
  }, id)

  return question
}