import { InMemoryQuestionCommentRepositories } from "test/repositories/In-memory-question-comment-repositories"
import { DeleteQuestionCommentUseCase } from "./delete-question-comment";
import { makeQuestionComment } from "test/factories/make-question-comment";
import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let questionCommentRepositories: InMemoryQuestionCommentRepositories;
let sut: DeleteQuestionCommentUseCase

describe('Delete Question Comment', () => {
  beforeEach(() => {
    questionCommentRepositories = new InMemoryQuestionCommentRepositories()
    sut = new DeleteQuestionCommentUseCase(questionCommentRepositories)
  })

  it('should be able to delete a question comment', async () => {
    const questionComment = makeQuestionComment()

    await questionCommentRepositories.create(questionComment)

    await sut.execute({
      questionCommentId: questionComment.id.toString(),
      authorId: questionComment.authorId.toString()
    })

    expect(questionCommentRepositories.items).toHaveLength(0)
  })

  it('should not be able delete another user question comment', async () => {
    const questionComment = makeQuestionComment({authorId: new UniqueEntitiesID('author-1')})

    await questionCommentRepositories.create(questionComment)

    
     const result = await sut.execute({
        questionCommentId: questionComment.id.toString(),
        authorId: 'author-2'
    })
    expect(result.isLeft()).toBe(true)
    expect(result.value).toBeInstanceOf(NotAllowedError)
  })
})