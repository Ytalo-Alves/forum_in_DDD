import { InMemoryQuestionRepositories } from "test/repositories/In-memory-question-repositories";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { EditQuestionUseCase } from "./edit-question";
import { NotAllowedError } from "./errors/not-allowed-error";
import { InMemoryAttachmentListRepositories } from "test/repositories/In-memory-question-attachment-list-repositories";
import { makeQuestionAttachment } from "test/factories/make-question-attachment";

let questionRepositories: InMemoryQuestionRepositories;
let questionAttachmentListRepositories: InMemoryAttachmentListRepositories;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {
  beforeEach(() => {
    questionAttachmentListRepositories = new InMemoryAttachmentListRepositories();
    questionRepositories = new InMemoryQuestionRepositories(questionAttachmentListRepositories);
    sut = new EditQuestionUseCase(
      questionRepositories,
      questionAttachmentListRepositories
    );
  });

  it("should be able to Edit question", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntitiesID("author-1"),
      },
      new UniqueEntitiesID("question-1")
    );

    await questionRepositories.create(newQuestion);

    questionAttachmentListRepositories.items.push(
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
      questionId: newQuestion.id.toString(),
      title: "New Question Title",
      content: "New Question Content",
      attachmentsIds: ['1', '3'],
    });

    expect(questionRepositories.items[0]).toMatchObject({
      title: "New Question Title",
      content: "New Question Content",
    });

    expect(questionRepositories.items[0].attachments.currentItems).toHaveLength(2)
        expect(questionRepositories.items[0].attachments.currentItems).toEqual([
          expect.objectContaining({attachmentId: new UniqueEntitiesID('1')}),
          expect.objectContaining({attachmentId: new UniqueEntitiesID('3')})
        ])
  });

  it("should not be able to Edit question from another user", async () => {
    const newQuestion = makeQuestion(
      {
        authorId: new UniqueEntitiesID("author-1"),
      },
      new UniqueEntitiesID("question-1")
    );

    await questionRepositories.create(newQuestion);

    const result = await sut.create({
      authorId: "author-2",
      questionId: newQuestion.id.toValue(),
      title: "New Question",
      content: "New Question",
      attachmentsIds: [],
    });
    expect(result.isLeft()).toBe(true);
    expect(result.value).toBeInstanceOf(NotAllowedError);
  });
});
