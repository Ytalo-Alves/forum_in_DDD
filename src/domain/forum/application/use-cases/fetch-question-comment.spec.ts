import { InMemoryQuestionCommentRepositories } from "test/repositories/In-memory-question-comment-repositories"
import { FetchQuestionCommentUseCase } from "./fetch-question-comment"
import { makeQuestionComment } from "test/factories/make-question-comment";
import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";

let fetchQuestionCommentRepositories: InMemoryQuestionCommentRepositories;
let sut: FetchQuestionCommentUseCase

describe('Fetch Question Comment', () => {
  beforeEach(() => {
    fetchQuestionCommentRepositories = new InMemoryQuestionCommentRepositories()
    sut = new FetchQuestionCommentUseCase(fetchQuestionCommentRepositories)
  })

  it('should be able to fetch question comment', async () => {
    await fetchQuestionCommentRepositories.create(makeQuestionComment({questionId: new UniqueEntitiesID('question-1')}))
    await fetchQuestionCommentRepositories.create(makeQuestionComment({questionId: new UniqueEntitiesID('question-1')}))
    await fetchQuestionCommentRepositories.create(makeQuestionComment({questionId: new UniqueEntitiesID('question-1')}))

    const {questionComment} = await sut.execute({
      questionId: 'question-1',
      page: 1
    })

    expect(questionComment).toHaveLength(3)

  })

  it('should be able to fetch question comments', async () => {
    for(let i = 1; i <= 22; i++) {
      await fetchQuestionCommentRepositories.create(makeQuestionComment({questionId: new UniqueEntitiesID('question-1')}))
    }
      const {questionComment} = await sut.execute({
        questionId: 'question-1',
        page: 2
      })
    

    expect(questionComment).toHaveLength(2)
  })
})