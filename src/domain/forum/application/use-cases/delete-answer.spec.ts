import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { DeleteAnswerUseCase } from "./delete-answer";
import { InMemoryAnswerRepositories } from "test/repositories/In-memory-answer-repositories";
import { makeAnswer } from "test/factories/make-answer";
import { NotAllowedError } from "./errors/not-allowed-error";

let answerRepositories: InMemoryAnswerRepositories;
let sut: DeleteAnswerUseCase;

describe("Delete Answer", () => {

  beforeEach(() => {
    answerRepositories = new InMemoryAnswerRepositories();
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

    const result = await sut.create({
        authorId: 'author-2',
        answerId: 'answer-1',
  })

  expect(result.isLeft()).toBe(true)
  expect(result.value).toBeInstanceOf(NotAllowedError)

    
  });
});
