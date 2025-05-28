import { left, right, type Either } from "@/core/types/either";
import { Answer } from "../../enterprise/entities/answer";
import { AnswerRepositories } from "../repositories/answer-repositories";
import { ResourceNotFoundError } from "./errors/resource-not-found.error";
import { NotAllowedError } from "./errors/not-allowed-error";
import { AnswerAttachmentList } from "../../enterprise/entities/answer-attachment-list";
import { AnswerAttachment } from "../../enterprise/entities/answer-attachment";
import { AnswerAttachmentsRepository } from "../repositories/answer-attachment-repositories";
import { UniqueEntitiesID } from "@/core/entities/unique-entities-id";

interface EditAnswerUseCaseRequest {
  answerId: string;
  authorId: string;
  content: string;
  attachmentsIds: string[];
}

type EditAnswerUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    answer: Answer
  }
>

export class EditAnswerUseCase {
  constructor(
    private answerRepositories: AnswerRepositories,
    private answerAttachmentsRepository: AnswerAttachmentsRepository
  ) {}

  async execute({
    authorId,
    answerId,
    content,
    attachmentsIds,
  }: EditAnswerUseCaseRequest): Promise<EditAnswerUseCaseResponse> {
    const answer = await this.answerRepositories.findById(answerId)

    if (!answer) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== answer.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentAnswerAttachments =
      await this.answerAttachmentsRepository.findManyByAnswerId(answerId)

    const answerAttachmentList = new AnswerAttachmentList(
      currentAnswerAttachments,
    )

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntitiesID(attachmentId),
        answerId: answer.id,
      })
    })

    answerAttachmentList.update(answerAttachments)

    answer.attachment = answerAttachmentList
    answer.content = content

    await this.answerRepositories.save(answer)

    return right({
      answer,
    })
  }
}