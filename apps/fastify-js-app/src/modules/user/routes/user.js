


export default async function (fastify, opts) {
  fastify.post('/add-many', async (req, reply) => {
    let values = req.body;
    let keys = Object.keys(values[0])
    values = values.map((obj) => keys.map((key) => obj[key]))
    let sql = "INSERT INTO User (" + keys.join(",") + ") VALUES ?;"
    //

    const connection = await fastify.mysql.getConnection()
    const [rows, fields] = await connection.query(sql, [values])
    connection.release()
    return reply.send(rows)
   
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
            name: { type: "number" }
          },
        },
      },
    },
    async (request, reply) => {
      const { name, email } = request.body;
      const connection = await fastify.mysql.getConnection()
      // console.log("BODY::", request.body)
      const [rows, fields] = await connection.query("INSERT INTO `User`(`email`,`name`) VALUES(?,?);", [email, name]);
      connection.release()
      return reply.send(rows)
    }
  )

  fastify.get("/list", async (request, reply, done) => {
    const connection = await fastify.mysql.getConnection()
    const [rows, fields] = await connection.query("SELECT user_id, name, email FROM User")
    connection.release()
    return reply.send(rows);
  });


  fastify.delete("/:id", async (request, reply, done) => {
      const id = request.params.id
      const connection = await fastify.mysql.getConnection()
      const [rows, fields] = await connection.query(
        "DELETE FROM User WHERE user_id=?", [id]
      )
      connection.release()
      return reply.send(rows)
  })
}
