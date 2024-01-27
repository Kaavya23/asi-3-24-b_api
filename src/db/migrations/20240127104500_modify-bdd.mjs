export const up = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.dropForeign(["roleId"])
  })
  await db.schema.dropTableIfExists("permissions")
  await db.schema.alterTable("users", (table) => {
    table.dropColumn("roleId")
  })
  await db.schema.dropTableIfExists("roles")
  await db.schema.alterTable("users", (table) => {
    table.boolean("isAdmin").defaultTo(false)
  })
}

export const down = async (db) => {
  await db.schema.alterTable("users", (table) => {
    table.dropColumn("isAdmin")
  })
  await db.schema.createTable("permissions", (table) => {
    table.increments("id").primary()
    table.text("action").notNullable()
    table.integer("roleId").notNullable()
    table.foreign("roleId").references("id").inTable("roles")
  })
  await db.schema.createTable("roles", (table) => {
    table.increments("id").primary()
    table.text("name").notNullable()
  })
  await db.schema.alterTable("users", (table) => {
    table.integer("roleId").notNullable()
    table.foreign("roleId").references("id").inTable("roles")
  })
}
