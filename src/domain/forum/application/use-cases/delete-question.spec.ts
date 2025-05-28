import { InMemoryQuestionRepositories } from "test/repositories/In-memory-question-repositories";
import { makeQuestion } from "test/factories/make-question";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { NotAllowedError } from "./errors/not-allowed-error";
import { InMemoryAttachmentListRepositories } from "test/repositories/In-memory-question-attachment-list-repositories";
import { makeQuestionAttachment } from "test/factories/make-question-attachment";

let questionRepositories: InMemoryQuestionRepositories;
let questionAttachmentRepositories: InMemoryAttachmentListRepositories;
let sut: DeleteQuestionUseCase;

describe("Delete Question", () => {
  beforeEach(() => {
    questionAttachmentRepositories = new InMemoryAttachmentListRepositories();
    questionRepositories = new InMemoryQuestionRepositories(questionAttachmentRepositories)
    sut = new DeleteQuestionUseCase(questionRepositories)
  });

  it("should be able to delete question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntitiesID("author-1"),
      },
      new UniqueEntitiesID("question-1")
    );

    await questionRepositories.create(newQuestion);

    questionAttachmentRepositories.items.push(
          makeQuestionAttachment({
            questionId: newQuestion.id,
            attachmentId: new UniqueEntitiesID("1"),
          }),
          makeQuestionAttachment({
            questionId: newQuestion.id,
            attachmentId: new UniqueEntitiesID("2"),
          })
        );

    await sut.create({
      authorId: "author-1",
      questionId: "question-1",
    });

    expect(questionAttachmentRepositories.items).toHaveLength(0);
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
