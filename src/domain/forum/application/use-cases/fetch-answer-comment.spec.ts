import { InMemoryAnswerCommentRepositories } from "test/repositories/In-memory-answer-comment-repositories";
import { FetchAnswerCommentUseCase } from "./fetch-answer-comment";
import { makeAnswerComment } from "test/factories/make-answer-comment";
import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";

let fetchAnswerCommentRepositories: InMemoryAnswerCommentRepositories;
let sut: FetchAnswerCommentUseCase;

describe("Fetch Answer Comment", () => {
  beforeEach(() => {
    fetchAnswerCommentRepositories = new InMemoryAnswerCommentRepositories();
    sut = new FetchAnswerCommentUseCase(fetchAnswerCommentRepositories);
  });

  it("should be able to fetch answer comment", async () => {
    await fetchAnswerCommentRepositories.create(
      makeAnswerComment({ answerId: new UniqueEntitiesID("author-1") })
    );
    await fetchAnswerCommentRepositories.create(
      makeAnswerComment({ answerId: new UniqueEntitiesID("author-1") })
    );
    await fetchAnswerCommentRepositories.create(
      makeAnswerComment({ answerId: new UniqueEntitiesID("author-1") })
    );

    const result = await sut.execute({
      answerId: "author-1",
      page: 1,
    });

    expect(result.value?.answerComments).toHaveLength(3);
  });

  it("should be able to fetch paginated answer comment", async () => {
    for (let i = 1; i <= 22; i++) {
      await fetchAnswerCommentRepositories.create(
        makeAnswerComment({ answerId: new UniqueEntitiesID("author-1") })
      );
    }

    const result = await sut.execute({
      answerId: "author-1",
      page: 2,
    });

    expect(result.value?.answerComments).toHaveLength(2);
  });
});
