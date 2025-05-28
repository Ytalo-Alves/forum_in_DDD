import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { InMemoryAnswerRepositories } from "test/repositories/In-memory-answer-repositories";
import { EditAnswerUseCase } from "./edit-answer";
import { makeAnswer } from "test/factories/make-answer";
import { NotAllowedError } from "./errors/not-allowed-error";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/In-memory-answer-attachment-repositories";
import { makeAnswerAttachment } from "test/factories/make-answer-attachment";

let answerRepositories: InMemoryAnswerRepositories;
let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    answerRepositories = new InMemoryAnswerRepositories(
      answerAttachmentsRepository
    );
    sut = new EditAnswerUseCase(
      answerRepositories,
      answerAttachmentsRepository
    );
  });

  it("should be able to Edit Answer", async () => {
    const newAnswer = makeAnswer(
      { authorId: new UniqueEntitiesID("author-1") },
      new UniqueEntitiesID("Answer-1")
    );

    await answerRepositories.create(newAnswer);

    answerAttachmentsRepository.items.push(
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntitiesID("1"),
      }),
      makeAnswerAttachment({
        answerId: newAnswer.id,
        attachmentId: new UniqueEntitiesID("2"),
      })
    );

    await sut.execute({
      authorId: "author-1",
      answerId: newAnswer.id.toString(),
      content: "New Answer Content",
      attachmentsIds: ["1", "3"],
    });

    expect(answerRepositories.items[0]).toMatchObject({
      content: "New Answer Content",
    });

    expect(answerRepositories.items[0].attachments.currentItems).toHaveLength(
      2
    );
    expect(answerRepositories.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({ attachmentId: new UniqueEntitiesID("1") }),
      expect.objectContaining({ attachmentId: new UniqueEntitiesID("3") }),
    ]);
  });

  it("should not be able to Edit Answer from another user", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntitiesID("author-1"),
      },
      new UniqueEntitiesID("Answer-1")
    );

    await answerRepositories.create(newAnswer);

    const result = await sut.execute({
      authorId: "author-2",
      answerId: "Answer-1",
      content: "New Answer",
      attachmentsIds: [],
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
