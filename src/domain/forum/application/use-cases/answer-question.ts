
import { UniqueEntitiesID } from '@/core/entities/unique-entities-id'
import { Answer } from '../../enterprise/entities/answer'
import { AnswerRepositories } from '../repositories/answer-repositories'
import { right,Either } from '@/core/types/either'

interface AnswerQuestionUseCaseRequest {
  instructorId: string
  questionId: string
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
  }: AnswerQuestionUseCaseRequest) : Promise<AnswerQuestionUseCaseResponse> {
    const answer = Answer.create({
      content,
      authorId: new UniqueEntitiesID(instructorId),
      questionId: new UniqueEntitiesID(questionId),
    })

    await this.answerRepositories.create(answer)

    return right({
      answer
    })
  }
}
