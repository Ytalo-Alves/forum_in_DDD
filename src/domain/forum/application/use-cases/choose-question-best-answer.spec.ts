import { InMemoryQuestionRepositories } from "test/repositories/In-memory-question-repositories";
import { makeQuestion } from "test/factories/make-question";
import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { InMemoryAnswerRepositories } from "test/repositories/In-memory-answer-repositories";
import { makeAnswer } from "test/factories/make-answer";
import { ChooseQuestionBestUseCase } from "./choose-question-best-answer";
import { NotAllowedError } from "./errors/not-allowed-error";
import { InMemoryAnswerAttachmentsRepository } from "test/repositories/In-memory-answer-attachment-repositories";
import { InMemoryAttachmentListRepositories } from "test/repositories/In-memory-question-attachment-list-repositories";

let questionRepositories: InMemoryQuestionRepositories;
let answerAttachmentsRepository: InMemoryAnswerAttachmentsRepository;
let questionAttachmentsRepository: InMemoryAttachmentListRepositories
let answerRepositories: InMemoryAnswerRepositories;
let sut: ChooseQuestionBestUseCase;

describe("Choose question best answer", () => {

  beforeEach(() => {
    answerAttachmentsRepository = new InMemoryAnswerAttachmentsRepository();
    questionAttachmentsRepository = new InMemoryAttachmentListRepositories();
    questionRepositories = new InMemoryQuestionRepositories(questionAttachmentsRepository);
    answerRepositories = new InMemoryAnswerRepositories(answerAttachmentsRepository);
    sut = new ChooseQuestionBestUseCase(questionRepositories, answerRepositories);
  });

  it("should be able to choose question best answer", async () => {

    const question = makeQuestion()
    const answer = makeAnswer({questionId: question.id})

    await questionRepositories.create(question)
    await answerRepositories.create(answer)

    await sut.execute({
      answerId: answer.id.toString(),
      authorId: question.authorId.toString()
    });

    expect(questionRepositories.items[0].bestAnswerId).toEqual(answer.id)
    
  });

  it("should not be able to choose another user question best answer", async () => {
    const question = makeQuestion(
      {authorId: new UniqueEntitiesID('author-1')}
    )
    const answer = makeAnswer({questionId: question.id})

    await questionRepositories.create(question)
    await answerRepositories.create(answer)

    const result = await sut.execute({
      answerId: answer.id.toString(),
      authorId: 'author-2'
    })

    expect(result.isLeft()).toBe(true),
    expect(result.value).toBeInstanceOf(NotAllowedError)

    
  });
});
