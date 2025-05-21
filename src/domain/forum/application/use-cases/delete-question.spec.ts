import { InMemoryQuestionRepositories } from "test/repositories/In-memory-question-repositories";
import { makeQuestion } from "test/factories/make-question";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { NotAllowedError } from "./errors/not-allowed-error";

let questionRepositories: InMemoryQuestionRepositories;
let sut: DeleteQuestionUseCase;

describe("Delete Question", () => {
  beforeEach(() => {
    questionRepositories = new InMemoryQuestionRepositories();
    sut = new DeleteQuestionUseCase(questionRepositories);
  });

  it("should be able to delete question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntitiesID("author-1"),
      },
      new UniqueEntitiesID("question-1")
    );

    await questionRepositories.create(newQuestion);

    await sut.create({
      authorId: "author-1",
      questionId: "question-1",
    });

    expect(questionRepositories.items).toHaveLength(0);
  });

  it("should not be able to delete question from another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntitiesID("author-1"),
      },
      new UniqueEntitiesID("question-1")
    );

    await questionRepositories.create(newQuestion);

    const result = await sut.create({
      authorId: "author-2",
      questionId: "question-1",
    });

    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
