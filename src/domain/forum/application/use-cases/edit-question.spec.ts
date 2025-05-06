import { InMemoryQuestionRepositories } from "test/repositories/In-memory-question-repositories";
import { makeQuestion } from "test/factories/make-question";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { EditQuestionUseCase } from "./edit-question";

let questionRepositories: InMemoryQuestionRepositories;
let sut: EditQuestionUseCase;

describe("Edit Question", () => {

  beforeEach(() => {
    questionRepositories = new InMemoryQuestionRepositories();
    sut = new EditQuestionUseCase(questionRepositories);
  });

  it("should be able to Edit question", async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntitiesID('author-1')
    }, new UniqueEntitiesID('question-1') )

    await questionRepositories.create(newQuestion)

    await sut.create({
      authorId: 'author-1',
      questionId: newQuestion.id.toString(),
      title: 'New Question Title',
      content: 'New Question Content',
    });

    expect(questionRepositories.items[0]).toMatchObject({
      title: 'New Question Title',
      content: 'New Question Content',
    });
    
  });

  it("should not be able to Edit question from another user", async () => {
    const newQuestion = makeQuestion({
      authorId: new UniqueEntitiesID('author-1')
    }, new UniqueEntitiesID('question-1') )

    await questionRepositories.create(newQuestion)

    await expect(() => 
      sut.create({
        authorId: 'author-2',
        questionId: 'question-1',
        title: 'New Question',
        content: 'New Question',
      })
    ).rejects.toBeInstanceOf(Error);

    
  });
});
