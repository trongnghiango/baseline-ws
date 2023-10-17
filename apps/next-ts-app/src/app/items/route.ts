import { createHandler, Get, Param } from "next-api-decorators"

class UserHandler {
  @Get()
  public list() {
    return DB.findAllUsers()
  }

  @Get("/:id")
  public details(@Param("id") id: string) {
    return DB.findUserById(id)
  }

  @Get("/:userId/comments")
  public comments(@Param("userId") userId: string) {
    return DB.findUserComments(userId)
  }

  @Get("/:userId/comments/:commentId")
  public commentDetails(
    @Param("userId") userId: string,
    @Param("commentId") commentId: string
  ) {
    return DB.findUserCommentById(userId, commentId)
  }
}

export default createHandler(UserHandler)
