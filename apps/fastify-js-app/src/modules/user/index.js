import fp from 'fastify-plugin'
import autoload from '@fastify/autoload'
import { join } from 'desm'


async function user (fastify, opts) {

  // These routes would be created in their own child instances
  fastify.register(autoload, {
    dir: join(import.meta.url, 'routes'),
    options: {
      prefix: opts.prefix
    }
  })
}

export default fp(user)
