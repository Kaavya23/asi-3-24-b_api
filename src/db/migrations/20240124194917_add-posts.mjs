export const up = async (db) => {
  await db.schema.createTable("posts", (table) => {
    table.increments("id").primary()
    table.text("title").notNullable()
    table.text("content").notNullable()
    table.integer("authorId").notNullable()
    table.foreign("authorId").references("id").inTable("users")
    table.timestamps(true, true, true)
  })
}

export const down = async (db) => {
   await db.schema.dropTable("posts")
}
