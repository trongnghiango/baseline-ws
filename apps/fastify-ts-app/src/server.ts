import { build } from "./app"
import closeWithGrace from "close-with-grace"
import dotenv from "dotenv"

dotenv.config()

const opts: any = {
  logger: {
    level: "debug",
  },
}

// We want to use pino-pretty only if there is a human watching this,
// otherwise we log as newline-delimited JSON.
if (process.stdout.isTTY) {
  opts.logger.transport = { target: "pino-pretty" }
}

const port = parseInt(process.env.PORT || "3000")
const host = process.env.HOST || "127.0.0.1"

async function start() {
  const app = await build(opts)
  console.log(app.printRoutes())
  await app.listen({ host, port })
  
  closeWithGrace({ delay: 500 }, async ({ err }) => {
    if (err) {
      app.log.error({ err }, "server closing due to error")
    }
    app.log.info("shutting down gracefully")
    await app.close()
  })
}
start();


