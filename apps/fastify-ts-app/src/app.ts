import fastify from "fastify"
import autoload from "@fastify/autoload"
import { join } from "path"
import mssql from "fastify-mssql"

export async function build(opts = {}) {
  const app = fastify(opts)
  console.log("(◥⁀ܫ⁀◤)", __dirname)
  // app.register(mssql, {
    
  // })

  app.register(autoload, {
    dir: join(__dirname ,"modules"),
    encapsulate: false,
    maxDepth: 1,
  })

  app.addHook("preSerialization", async (request, reply, payload) => {
    return { wrapped: payload }
  })

  app.setErrorHandler(async (err, request, reply) => {
    console.log("TEST::::", err.message)
    if (err.validation) {
      reply.code(403)
      return err.message
    }
    request.log.error("TEST:::", { err })
    reply.code(err.statusCode || 500)

    return (
      err || "I'm sorry, there was an error processing your request."
    )
  })

  app.setNotFoundHandler(async (request, reply) => {
    reply.code(404)
    return {
      msg: "I'm sorry, I couldn't find what you were looking for.",
    }
  })

  return app
}
