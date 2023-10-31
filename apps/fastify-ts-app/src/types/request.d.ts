import { FastifyRequest } from "fastify"

interface AuthenticatedUser {
  /* ... */
  user: unknown
}

declare module "fastify" {
  export type AuthFastifyRequest = FastifyRequest & {
    authenticatedUser?: AuthenticatedUser
  }
}
