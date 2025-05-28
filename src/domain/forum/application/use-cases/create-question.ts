import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";
import { QuestionRepositories } from "../repositories/question-repositories";
import { Question } from "../../enterprise/entities/question";
import { right, Either } from "@/core/types/either";
import { QuestionAttachment } from "../../enterprise/entities/question-attachment";
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list";

interface CreateQuestionUseCaseRequest {
  authorId: string;
  title: string;
  content: string;
  attachmentsIds: string[]
}

type CreateQuestionUseCaseResponse = Either<
  null,
  {
    question: Question;
  }
>;

export class CreateQuestionUseCase {
  constructor(private questionRepositories: QuestionRepositories) {}

  async execute({
    authorId,
    title,
    content,
    attachmentsIds
  }: CreateQuestionUseCaseRequest): Promise<CreateQuestionUseCaseResponse> {

    const question = Question.create({
      authorId: new UniqueEntitiesID(authorId),
      title,
      content,
    });

    const questionAttachments = attachmentsIds.map((attachmentId) => {
      return QuestionAttachment.create({
        attachmentId: new UniqueEntitiesID(attachmentId),
        questionId: question.id
      })
    })

    question.attachments = new QuestionAttachmentList(questionAttachments)

    await this.questionRepositories.create(question);

    return right({ question });
  }
}
