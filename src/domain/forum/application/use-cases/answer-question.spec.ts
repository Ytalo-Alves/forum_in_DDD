import { randomUUID } from "node:crypto";
import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswerRepositories } from "test/repositories/In-memory-answer-repositories";

let answerQuestion: InMemoryAnswerRepositories;
let sut: AnswerQuestionUseCase;

describe("Answer Question", () => {
  beforeEach(() => {
    answerQuestion = new InMemoryAnswerRepositories();
    sut = new AnswerQuestionUseCase(answerQuestion);
  });

  it("should be able to create an answer", async () => {
    const result = await sut.execute({
      questionId: randomUUID(),
      instructorId: randomUUID(),
      content: "Nova resposta",
    });

    expect(result.isRight()).toBe(true)
    expect(answerQuestion.items[0]).toEqual(result.value?.answer);
  });
});
