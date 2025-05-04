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
    const { question } = await sut.create({
      authorId: "1",
      title: "O que é o TypeScript?",
      content:
        "TypeScript é um superconjunto tipado de JavaScript que compila para JavaScript puro.",
    });
    expect(question.id).toBeTruthy();
    expect(questionRepositories.items[0].id).toEqual(question.id);
  });
});
