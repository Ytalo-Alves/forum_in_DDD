import { InMemoryQuestionRepositories } from "test/repositories/In-memory-question-repositories";
import { GetQuestionBySlugUseCase } from "./get-question-by-slug";
import { makeQuestion } from "test/factories/make-question";
import { Slug } from "../../enterprise/entities/value-object/slug";
import { InMemoryAttachmentListRepositories } from "test/repositories/In-memory-question-attachment-list-repositories";

let questionAttachmentsRepository: InMemoryAttachmentListRepositories;
let questionRepositories: InMemoryQuestionRepositories;
let sut: GetQuestionBySlugUseCase;

describe("Get Question by slug", () => {

  beforeEach(() => {
    questionAttachmentsRepository = new InMemoryAttachmentListRepositories();
    questionRepositories = new InMemoryQuestionRepositories(questionAttachmentsRepository);
    sut = new GetQuestionBySlugUseCase(questionRepositories);
  });

  it("should be able to get a question by slug", async () => {
    const newQuestion = makeQuestion({
      slug: Slug.create('example-question'),
    })

    await questionRepositories.create(newQuestion)

    const result = await sut.execute({
      slug: 'example-question',
    })

    expect(result.value).toMatchObject({
      question: expect.objectContaining({
        title: newQuestion.title,
      }),
    })
  });
});
