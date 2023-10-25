const sampleSql = "CREATE TABLE `sinhVien`(`sinhvien_id` INT UNSIGNED NOT NULL auto_increment ,`name` VARCHAR(250) NOT NULL ,PRIMARY KEY(`sinhvien_id`));"


export default async function (fastify, opts) {
  fastify.get('/createtb', async (request, reply) => {
    const connection = await fastify.mysql.getConnection()
    const [rows, fields] = await connection.query(sampleSql)
    connection.release()
    return reply.send(rows)
  })
  /**
   * Tao sinh vien (tao nhieu sv cung 1 luc)
   */
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
    const [rows, fields] = await connection.query("SELECT student_id, name, email FROM User")
    connection.release()
    return reply.send(rows);
  });


  fastify.delete("/:id", async (request, reply, done) => {
      const id = request.params.id
      const connection = await fastify.mysql.getConnection()
      const [rows, fields] = await connection.query(
        "DELETE FROM User WHERE student_id=?", [id]
      )
      connection.release()
      return reply.send(rows)
  })
}
