import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { InMemoryAnswerRepositories } from "test/repositories/In-memory-answer-repositories";
import { EditAnswerUseCase } from "./edit-answer";
import { makeAnswer } from "test/factories/make-answer";
import { NotAllowedError } from "./errors/not-allowed-error";

let answerRepositories: InMemoryAnswerRepositories;
let sut: EditAnswerUseCase;

describe("Edit Answer", () => {
  beforeEach(() => {
    answerRepositories = new InMemoryAnswerRepositories();
    sut = new EditAnswerUseCase(answerRepositories);
  });

  it("should be able to Edit Answer", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntitiesID("author-1"),
      },
      new UniqueEntitiesID("Answer-1")
    );

    await answerRepositories.create(newAnswer);

    await sut.create({
      authorId: "author-1",
      answerId: newAnswer.id.toString(),
      content: "New Answer Content",
    });

    expect(answerRepositories.items[0]).toMatchObject({
      content: "New Answer Content",
    });
  });

  it("should not be able to Edit Answer from another user", async () => {
    const newAnswer = makeAnswer(
      {
        authorId: new UniqueEntitiesID("author-1"),
      },
      new UniqueEntitiesID("Answer-1")
    );

    await answerRepositories.create(newAnswer);

    const result = await sut.create({
      authorId: "author-2",
      answerId: "Answer-1",
      content: "New Answer",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
