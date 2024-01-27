import BaseModel from "@/db/models/BaseModel"
import CategoryModel from "@/db/models/CategoryModel"
import UserModel from "@/db/models/CategoryModel"

class TodoModel extends BaseModel {
  static tableName = "todos"
  static get relationMappings() {
    return {
      // nom du lien
      category: {
        relation: BaseModel.BelongsToOneRelation, // catégorie se transforme en commentaire, donc plusieurs relations
        modelClass: CategoryModel, // le modèle auquel il est relié
        join: {
          from: "todos.categoryId", // on joint les colonnes ciblés nomDeLaTable.LaColonne
          to: "categories.id",
        },
      },
      user: { // rajouter par moi
        relation: BaseModel.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "todos.userId",
          to: "users.id",
        },
      },
    }
  }
}

export default TodoModel
