import { InMemoryAnswerCommentRepositories } from "test/repositories/In-memory-answer-comment-repositories"
import { DeleteAnswerCommentUseCase } from "./delete-answer-comment";
import { makeAnswerComment } from "test/factories/make-answer-comment";
import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";

let deleteAnswerCommentRepositories : InMemoryAnswerCommentRepositories;
let sut : DeleteAnswerCommentUseCase;

describe('Delete Answer Comment', () => {
  beforeEach(() => {
    deleteAnswerCommentRepositories = new InMemoryAnswerCommentRepositories()
    sut = new DeleteAnswerCommentUseCase(deleteAnswerCommentRepositories)
  })

  it('should be able to delete a answer comment', async () => {
    const answerComment = makeAnswerComment()

    await deleteAnswerCommentRepositories.create(answerComment)

    await sut.execute({
      answerCommentId: answerComment.id.toString(),
      authorId: answerComment.authorId.toString()
    })

    expect(deleteAnswerCommentRepositories.itens).toHaveLength(0)
  })

  it('should be able to delete another user answer comment', async () => {
    const answerComment = makeAnswerComment({authorId: new UniqueEntitiesID('author-1')})

    await deleteAnswerCommentRepositories.create(answerComment)

    await expect(() => {
      return sut.execute({
        answerCommentId: answerComment.id.toString(),
        authorId: 'author-2'
      })
    }).rejects.toBeInstanceOf(Error)
  })
})