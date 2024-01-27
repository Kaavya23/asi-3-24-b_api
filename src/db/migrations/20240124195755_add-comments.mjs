export const up = async (db) => {
  await db.schema.createTable("comments", (table) => {
    table.increments("id").primary()
    table.text("content").notNullable()
    table.integer("userId").notNullable()
    table.foreign("userId").references("id").inTable("users")
    table.integer("postId").notNullable()
    table.foreign("postId").references("id").inTable("posts")
    table.timestamps(true, true, true)
  })
}

export const down = async (db) => {
  await db.schema.dropTable("comments")
}
