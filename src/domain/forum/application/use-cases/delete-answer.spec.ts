import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { DeleteAnswerUseCase } from "./delete-answer";
import { InMemoryAnswerRepositories } from "test/repositories/In-memory-answer-repositories";
import { makeAnswer } from "test/factories/make-answer";
import { NotAllowedError } from "./errors/not-allowed-error";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/In-memory-answer-attachment-repositories";
import { makeAnswerAttachment } from "test/factories/make-answer-attachment";

let answerRepositories: InMemoryAnswerRepositories;
let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: DeleteAnswerUseCase;

describe("Delete Answer", () => {

  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    answerRepositories = new InMemoryAnswerRepositories(answerAttachmentsRepository);
    sut = new DeleteAnswerUseCase(answerRepositories);
  });

  it("should be able to delete question", async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntitiesID('author-1')
    }, new UniqueEntitiesID('answer-1') )

    await answerRepositories.create(newAnswer)

    await sut.create({
      authorId: 'author-1',
      answerId: 'answer-1',
    });

    expect(answerRepositories.items).toHaveLength(0);
    
  });

  it("should not be able to delete question from another user", async () => {
    const newAnswer = makeAnswer({
      authorId: new UniqueEntitiesID('author-1')
    }, new UniqueEntitiesID('answer-1') )

    await answerRepositories.create(newAnswer)

    answerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntitiesID('1'),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntitiesID('2'),
      })
    )

    const result = await sut.create({
      answerId: 'answer-1',
      authorId: 'author-1',
  })

  expect(answerRepositories.items).toHaveLength(0)
  expect(answerAttachmentsRepository.items).toHaveLength(0)

    
  });
});
