import { InMemoryQuestionCommentRepositories } from "test/repositories/In-memory-question-comment-repositories";
import { InMemoryQuestionRepositories } from "test/repositories/In-memory-question-repositories"
import { CommentOnQuestionUseCase } from "./comment-on-question";
import { makeQuestion } from "test/factories/make-question";
import { InMemoryAttachmentListRepositories } from "test/repositories/In-memory-question-attachment-list-repositories";

let inMemoryQuestionRepositories: InMemoryQuestionRepositories;
let inMemoryQuestionCommentRepositories: InMemoryQuestionCommentRepositories
let inMemoryQuestionAttachmentsRepositories: InMemoryAttachmentListRepositories
let sut: CommentOnQuestionUseCase

describe('Comment on Question', () => {
  beforeEach(() => {
    inMemoryQuestionAttachmentsRepositories = new InMemoryAttachmentListRepositories();
    inMemoryQuestionRepositories = new InMemoryQuestionRepositories(inMemoryQuestionAttachmentsRepositories);
    inMemoryQuestionCommentRepositories = new InMemoryQuestionCommentRepositories()
    sut = new CommentOnQuestionUseCase(inMemoryQuestionRepositories, inMemoryQuestionCommentRepositories)
  })

  it('should be able to comment on question', async () => {
    const question = makeQuestion()

    await inMemoryQuestionRepositories.create(question)

    await sut.execute({
      questionId: question.id.toString(),
      authorId: question.authorId.toString(),
      content: "Comentário teste"
    })

    expect(inMemoryQuestionCommentRepositories.items[0].content).toEqual("Comentário teste")
  })
})