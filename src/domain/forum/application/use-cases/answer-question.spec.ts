import { randomUUID } from "node:crypto";
import { AnswerQuestionUseCase } from "./answer-question";
import { InMemoryAnswerRepositories } from "test/repositories/In-memory-answer-repositories";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/In-memory-answer-attachment-repositories";


let answerQuestion: InMemoryAnswerRepositories;
let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let sut: AnswerQuestionUseCase;

describe("Answer Question", () => {
  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    answerQuestion = new InMemoryAnswerRepositories(answerAttachmentsRepository);
    sut = new AnswerQuestionUseCase(answerQuestion);
  });

  it("should be able to create an answer", async () => {
    const result = await sut.execute({
      questionId: randomUUID(),
      instructorId: randomUUID(),
      content: "Nova resposta",
      attachmentsIds: ['1', '2'],
    });

    expect(result.isRight()).toBe(true)
    expect(answerQuestion.items[0]).toEqual(result.value?.answer);
  });
});
