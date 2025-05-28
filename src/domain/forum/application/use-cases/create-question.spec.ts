import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { QuestionRepositories } from "../repositories/question-repositories";
import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionRepositories } from "test/repositories/In-memory-question-repositories";
import { InMemoryAttachmentListRepositories } from "test/repositories/In-memory-question-attachment-list-repositories";

let questionAttachmentRepositories: InMemoryAttachmentListRepositories;
let questionRepositories: InMemoryQuestionRepositories;
let sut: CreateQuestionUseCase;

describe("Create Question", () => {

  beforeEach(() => {
    questionAttachmentRepositories = new InMemoryAttachmentListRepositories()
    questionRepositories = new InMemoryQuestionRepositories(questionAttachmentRepositories);
    sut = new CreateQuestionUseCase(questionRepositories);
  });

  it("should be able to create a question", async () => {
    const result = await sut.execute({
      authorId: "1",
      title: "O que é o TypeScript?",
      content: "TypeScript é um superconjunto tipado de JavaScript que compila para JavaScript puro.",
      attachmentsIds: ['1', '2'],
    });
    
    expect(result.isRight()).toBe(true)
    expect(questionRepositories.items[0]).toEqual(result.value?.question);
    expect(questionRepositories.items[0].attachments.currentItems).toHaveLength(2)
    expect(questionRepositories.items[0].attachments.currentItems).toEqual([
      expect.objectContaining({attachmentId: new UniqueEntitiesID('1')}),
      expect.objectContaining({attachmentId: new UniqueEntitiesID('2')})
    ])

  });
});
