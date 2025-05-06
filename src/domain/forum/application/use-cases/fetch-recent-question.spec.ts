import { InMemoryQuestionRepositories } from "test/repositories/In-memory-question-repositories";
import { makeQuestion } from "test/factories/make-question";
import { FetchRecentQuestionUseCase } from "./fetch-recent-question";

let questionRepositories: InMemoryQuestionRepositories;
let sut: FetchRecentQuestionUseCase;

describe("Fetch Recente Question", () => {
  beforeEach(() => {
    questionRepositories = new InMemoryQuestionRepositories();
    sut = new FetchRecentQuestionUseCase(questionRepositories);
  });

  it("should be able to fetch recent questions", async () => {
    await questionRepositories.create(
      makeQuestion({ createdAt: new Date(2025, 0, 20) })
    );
    await questionRepositories.create(
      makeQuestion({ createdAt: new Date(2025, 0, 18) })
    );
    await questionRepositories.create(
      makeQuestion({ createdAt: new Date(2025, 0, 23) })
    );

    const { questions } = await sut.create({
      page: 1,
    });

    expect(questions).toEqual([
      expect.objectContaining({ createdAt: new Date(2025, 0, 23) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 20) }),
      expect.objectContaining({ createdAt: new Date(2025, 0, 18) }),
    ]);
  });

  it("should be able to fetch paginated recent questions", async () => {
    for (let i = 1; i <= 22; i++) {
      await questionRepositories.create(makeQuestion());
    }

    const { questions } = await sut.create({
      page: 2,
    });

    expect(questions).toHaveLength(2);
  });
});
