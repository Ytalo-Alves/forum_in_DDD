import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { AnswerComment, type answerCommentProps } from "@/domain/forum/enterprise/entities/answer-comment";
import { faker } from "@faker-js/faker";

export function makeAnswerComment(
  override: Partial<answerCommentProps> = {},
  id?: UniqueEntitiesID
) {
  const answer = AnswerComment.create({
    authorId: new UniqueEntitiesID(),
    answerId: new UniqueEntitiesID(),
    content: faker.lorem.text(),
    ...override
  }, id)

  return answer
}