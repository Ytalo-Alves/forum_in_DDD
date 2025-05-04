import { InMemoryQuestionRepositories } from "test/repositories/In-memory-question-repositories";
import { makeQuestion } from "test/factories/make-question";
import { DeleteQuestionUseCase } from "./delete-question";
import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";

let questionRepositories: InMemoryQuestionRepositories;
let sut: DeleteQuestionUseCase;

describe("Delete Question", () => {

  beforeEach(() => {
    questionRepositories = new InMemoryQuestionRepositories();
    sut = new DeleteQuestionUseCase(questionRepositories);
  });

  it("should be able to delete question", async () => {
    const newQuestion = makeQuestion({}, new UniqueEntitiesID('question-1') )

    await questionRepositories.create(newQuestion)

    await sut.create({
      questionId: 'question-1',
    });

    expect(questionRepositories.items).toHaveLength(0);
    
  });
});
