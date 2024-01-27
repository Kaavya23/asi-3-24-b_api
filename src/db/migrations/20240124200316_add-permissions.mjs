export const up = async (db) => {
  await db.schema.createTable("permissions", (table) => {
    table.increments("id").primary()
    table.text("action").notNullable()
    table.integer("roleId").notNullable()
    table.foreign("roleId").references("id").inTable("roles")
  })
}

export const down = async (db) => {
  await db.schema.dropTable("permissions")
}
