import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()
import { AuthFastifyRequest, FastifyInstance, FastifyLoggerOptions, FastifyRequest } from "fastify"
import { IncomingMessage, Server, ServerResponse } from "http"

export default async function (
  fastify: FastifyInstance,
  opts: FastifyLoggerOptions
) {
  fastify.post("/add-many", async (req, reply) => {
    const data = await prisma.giaoVien.findMany({})
    return {
      data,
      msg: "add many records",
    }
  })

  //
  fastify.post(
    "/create",
    {
      schema: {
        body: {
          type: "object",
          properties: {
            email: { type: "string" },
            name: { type: "number" },
          },
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body as { name: string; email: string }

      return reply.send({
        msg: "created",
      })
    }
  )

  fastify.get("/list", async (request, reply) => {
    const giaovien = await prisma.giaoVien.findMany();
    const hocsinh = await prisma.hocSinh.findMany();
    return reply.send({
      data: {giaovien, hocsinh},
      msg: "List...",
    })
  })

  fastify.get(
    "/:MaGV",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            MaGV: { type: "string" },
          },
        },
      },
    },
    async (
      request: FastifyRequest<
        { Params: { MaGV: string } }
      >,
      reply
    ) => {
      const { MaGV } = request.params
      const giaovien = await prisma.giaoVien.findFirst({
        where: { MaGV },
      })
      return reply.send({
        data: giaovien,
        msg: giaovien ? "OK" : "Không tìm thấy",
      })
    }
  )

  fastify.delete(
    "/:MaGV",
    {
      schema: {
        params: {
          type: "object",
          properties: {
            MaGV: { type: "string" },
          },
        },
      },
    },
    async (
      request: FastifyRequest<{ Params: { MaGV: string } }>,
      reply
    ) => {
      const { MaGV } = request.params
      const result = await prisma.giaoVien.delete({
        where: { MaGV },
      })
      return reply.send({
        msg: result ? "deleted" : "not delete",
      })
    }
  )
}
