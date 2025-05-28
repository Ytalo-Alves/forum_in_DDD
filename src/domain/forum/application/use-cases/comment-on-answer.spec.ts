import { InMemoryAnswerCommentRepositories } from "test/repositories/In-memory-answer-comment-repositories";
import { InMemoryAnswerRepositories } from "test/repositories/In-memory-answer-repositories"
import { CommentOnAnswerUseCase } from "./comment-on-answer";
import { makeAnswer } from "test/factories/make-answer";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/In-memory-answer-attachment-repositories";

let answerRepositories: InMemoryAnswerRepositories;
let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let answerCommentRepositories: InMemoryAnswerCommentRepositories;
let sut : CommentOnAnswerUseCase

describe('Comment on Answer', () =>{
  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    answerRepositories = new InMemoryAnswerRepositories(answerAttachmentsRepository);
    answerCommentRepositories = new InMemoryAnswerCommentRepositories();

    sut = new CommentOnAnswerUseCase(answerRepositories, answerCommentRepositories)
  })

  it('should be able to comment on answer', async () => {
    const answer = makeAnswer()

    await answerRepositories.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: answer.authorId.toString(),
      content: 'Comentário teste'
    })

    expect(answerCommentRepositories.itens[0].content).toEqual("Comentário teste")
  })
})