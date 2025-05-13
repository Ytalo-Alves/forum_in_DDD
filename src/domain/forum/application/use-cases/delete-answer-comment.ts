import type { InMemoryAnswerCommentRepositories } from "test/repositories/In-memory-answer-comment-repositories";

interface DeleteAnswerCommentUseCaseRequest {
  authorId: string;
  answerCommentId: string;
}

export class DeleteAnswerCommentUseCase {
  constructor(
    private answerCommentRepositories: InMemoryAnswerCommentRepositories
  ) {}

  async execute({
    authorId,
    answerCommentId
  }: DeleteAnswerCommentUseCaseRequest) {
    const answerComment = await this.answerCommentRepositories.findById(answerCommentId)

    if(!answerComment){
      throw new Error('Answer Comment no found.')
    }

    if(answerComment.authorId.toString() !== authorId) {
      throw new Error('Not Allowed')
    }

    await this.answerCommentRepositories.delete(answerComment)

    return
  }
}