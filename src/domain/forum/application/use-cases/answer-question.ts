
import { UniqueEntitiesID } from '@/core/entities/unique-entities-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepositories } from '../repositories/answer-repositories'
import { right,Either } from '@/core/types/either'
import { AnswerAttachment } from '../../enterprise/entities/answer-attachment'
import { AnswerAttachmentList } from '../../enterprise/entities/answer-attachment-list'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
  attachmentsIds: string[]
  content: string
}

type AnswerQuestionUseCaseResponse = Either<
  null,
  {
    answer: Answer
  }
>

export class AnswerQuestionUseCase {
  constructor(private answerRepositories: AnswerRepositories) {}

  async execute({
    instructorId,
    questionId,
    content,
    attachmentsIds,
  }: AnswerQuestionUseCaseRequest) : Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntitiesID(instructorId),
      questionId: new UniqueEntitiesID(questionId),
    })

    const answerAttachments = attachmentsIds.map((attachmentId) => {
      return AnswerAttachment.create({
        attachmentId: new UniqueEntitiesID(attachmentId),
        answerId: answer.id,
      })
    })

    answer.attachment = new AnswerAttachmentList(answerAttachments)

    await this.answerRepositories.create(answer)

    return right({
      answer
    })
  }
}
