export const asyncHandler = (execution) => (request, reply, next) => {
  execution(request, reply, next).catch((err) => { throw new Error('Oops!', err.message); })
}