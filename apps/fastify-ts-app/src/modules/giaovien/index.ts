import fp from 'fastify-plugin'
import autoload from '@fastify/autoload'
import path from 'path'
import { FastifyInstance } from 'fastify'


async function giaovien(fastify: FastifyInstance, opts: any) {
  // These routes would be created in their own child instances
  fastify.register(autoload, {
    dir: path.join(__dirname, "routes"),
    options: {
      prefix: opts.prefix,
    },
  })
}

export default fp(giaovien)
