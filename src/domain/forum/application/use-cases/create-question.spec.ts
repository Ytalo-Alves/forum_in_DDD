import { QuestionRepositories } from "../repositories/question-repositories";
import { CreateQuestionUseCase } from "./create-question";
import { InMemoryQuestionRepositories } from "test/repositories/In-memory-question-repositories";

let questionRepositories: InMemoryQuestionRepositories;
let sut: CreateQuestionUseCase;

describe("Create Question", () => {

  beforeEach(() => {
    questionRepositories = new InMemoryQuestionRepositories();
    sut = new CreateQuestionUseCase(questionRepositories);
  });

  it("should be able to create a question", async () => {
    const result = await sut.execute({
      authorId: "1",
      title: "O que é o TypeScript?",
      content:
        "TypeScript é um superconjunto tipado de JavaScript que compila para JavaScript puro.",
    });
    
    expect(result.isRight()).toBe(true)
    expect(questionRepositories.items[0]).toEqual(result.value?.question);
  });
});
