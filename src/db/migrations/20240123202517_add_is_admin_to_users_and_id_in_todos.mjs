export const up = async (db) => {
  await db.schema.alterTable("todos", (table) => {
    table.integer("userId").notNullable()
    table.foreign("userId").references("id").inTable("users")
  })

  await db.schema.alterTable("users", (table) => {
    table.boolean("isAdmin").defaultTo(false)
  })
}

export const down = async (db) => {
  await db.schema.alterTable("todos", (table) => {
    table.dropColumn("userId")
  })

  await db.schema.alterTable("users", (table) => {
    table.dropColumn("isAdmin")
  })
}
