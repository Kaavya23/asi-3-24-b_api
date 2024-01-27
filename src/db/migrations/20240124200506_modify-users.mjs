export const up = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.dropColumn("isAdmin")
  })
  await db.schema.alterTable("users", (table) => {
    table.integer("roleId").notNullable()
    table.foreign("roleId").references("id").inTable("roles")
  })
  await db.schema.alterTable("users", (table) => {
    table.text("username").notNullable()
  })
}

export const down = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.dropColumn("roleId")
    table.dropColumn("username")
  })
}
