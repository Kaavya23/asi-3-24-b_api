export const up = async (db) => {
  await db.schema.createTable("roles", (table) => {
    table.increments("id").primary()
    table.text("name").notNullable()
  })
}

export const down = async (db) => {
  await db.schema.dropTable("roles")
}
