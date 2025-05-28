import { left, right, Either } from "@/core/types/either"
import { Question } from "../../enterprise/entities/question"
import { QuestionRepositories } from "../repositories/question-repositories"
import { ResourceNotFoundError } from "./errors/resource-not-found.error"
import { NotAllowedError } from "./errors/not-allowed-error"
import { QuestionAttachmentRepositories } from "../repositories/question-attachment-repositories"
import { QuestionAttachmentList } from "../../enterprise/entities/question-attachment-list"
import { QuestionAttachment } from "../../enterprise/entities/question-attachment"
import { UniqueEntitiesID } from "@/core/entities/unique-entities-id"


interface EditQuestionUseCaseRequest {
  authorId: string
  questionId: string
  title: string
  content: string
  attachmentsIds: string[]
}

type EditQuestionUseCaseResponse = Either<
  ResourceNotFoundError | NotAllowedError,
  {
    question: Question
  }
>

export class EditQuestionUseCase {
  constructor(
    private questionRepositories: QuestionRepositories,
    private questionAttachmentRepositories: QuestionAttachmentRepositories
  ) {}

  async create({
    authorId,
    questionId,
    title,
    content,
    attachmentsIds
  }: EditQuestionUseCaseRequest): Promise<EditQuestionUseCaseResponse> {

    const question = await this.questionRepositories.findById(questionId)

    if(!question) {
      return left(new ResourceNotFoundError())
    }

    if (authorId !== question.authorId.toString()) {
      return left(new NotAllowedError())
    }

    const currentQuestionAttachments = await this.questionAttachmentRepositories.findManyByQuestionId(questionId)

    const questionAttachmentList = new QuestionAttachmentList(currentQuestionAttachments)

    const questionAttachments = attachmentsIds.map((attachmentId) => {
        return QuestionAttachment.create({
          attachmentId: new UniqueEntitiesID(attachmentId),
          questionId: question.id
        })
      })

      questionAttachmentList.update(questionAttachments)

    question.title = title
    question.content = content
    question.attachments = questionAttachmentList
 
    await this.questionRepositories.save(question)

    return right({question})
  }
}
