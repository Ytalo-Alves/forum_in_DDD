import type { QuestionCommentRepositories } from "../repositories/question-comment-repositories";

interface DeleteQuestionCommentUseCaseRequest {
  authorId: string;
  questionCommentId: string;
}

export class DeleteQuestionCommentUseCase {
  constructor(
    private questionCommentRepositories : QuestionCommentRepositories
  ) {}

  async execute({
    authorId,
    questionCommentId
  }: DeleteQuestionCommentUseCaseRequest) {
    const questionComment = await this.questionCommentRepositories.findById(questionCommentId)

    if(!questionComment) {
      throw new Error('Question comment not found.')
    }

    if(questionComment.authorId.toString() !== authorId){
      throw new Error('Not allowed')
    }

    await this.questionCommentRepositories.delete(questionComment)

    return {}
  }
}