import fastify from 'fastify'
import autoload from '@fastify/autoload'
import mysql from '@fastify/mysql'
// import bodyParser from 'body-parser'
import { join } from 'desm'

export async function build (opts = {}) {
  const app = fastify(opts)

  console.log(process.env.DATABASE_URL)
  
  app.register(mysql, {
    promise: true,
    connectionString: process.env.DATABASE_URL,
  })

  // app.use(bodyParser.json())
  app.addContentTypeParser(
    "application/jsoff",
    function (request, payload, done) {
      jsoffParser(payload, function (err, body) {
        done(err, body)
      })
    }
  )

  app.register(autoload, {
    dir: join(import.meta.url, 'modules'),
    encapsulate: false,
    maxDepth: 1
  })


  app.setErrorHandler(async (err, request, reply) => {
    console.log('TEST::::', err.message)
    if (err.validation) {
      reply.code(403)
      return err.message
    }
    request.log.error('TEST:::',{ err })
    reply.code(err.statusCode || 500)

    return err.message || "I'm sorry, there was an error processing your request."
  })

  app.setNotFoundHandler(async (request, reply) => {
    reply.code(404)
    return {
      msg: "I'm sorry, I couldn't find what you were looking for."
    }
  })

  return app
}
