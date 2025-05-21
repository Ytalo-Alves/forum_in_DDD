import { makeQuestion } from "test/factories/make-question";
import { InMemoryAnswerRepositories } from "test/repositories/In-memory-answer-repositories";
import { FetchQuestionAnswerUseCase } from "./fetch-question-answer";
import { makeAnswer } from "test/factories/make-answer";
import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";

let answerRepositories: InMemoryAnswerRepositories;
let sut: FetchQuestionAnswerUseCase;

describe("Fetch Question Answer", () => {
  beforeEach(() => {
    answerRepositories = new InMemoryAnswerRepositories();
    sut = new FetchQuestionAnswerUseCase(answerRepositories);
  });

  it("should be able to fetch questions answer", async () => {
    await answerRepositories.create(makeAnswer({questionId: new UniqueEntitiesID('question-1')}));
    await answerRepositories.create(makeAnswer({questionId: new UniqueEntitiesID('question-1')}));
    await answerRepositories.create(makeAnswer({questionId: new UniqueEntitiesID('question-1')}));    

    const result = await sut.create({
      questionId: 'question-1',
      page: 1
    });

    expect(result.value?.answers).toHaveLength(3)
  });

  it("should be able to fetch paginated questions answers", async () => {
    for (let i = 1; i <= 22; i++) {
      await answerRepositories.create(makeAnswer({questionId: new UniqueEntitiesID('question-1')}));
    }

    const result = await sut.create({
      questionId: 'question-1',
      page: 2,
    });

    expect(result.value?.answers).toHaveLength(2);
  });
});
