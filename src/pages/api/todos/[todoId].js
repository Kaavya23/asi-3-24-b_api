import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  idValidator,
  statusValidator,
  todoDescriptionValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: { // récupérer le todoId de l'url (donc celui qui est entre crochet)
        todoId: idValidator,
      },
    }),
    async ({
      models: { TodoModel },
      input: {
        query: { todoId },
      },
      res,
    }) => {
      const todo = await TodoModel.query().findById(todoId).throwIfNotFound() //query() sert à créer une requête sql
      // throwIfNotFound() arrête la requête s'il ne le trouve pas

      res.send(todo)
    },
  ],
  PATCH: [
    auth,
    validate({
      query: {
        todoId: idValidator,
      },
      body: {
        description: todoDescriptionValidator.optional(),
        categoryId: idValidator.optional(),
        isDone: statusValidator.optional(),
      },
    }),
    async ({
      models: { TodoModel },
      input: {
        body,
        query: { todoId },
      },
      res,
    }) => {
      const updatedTodo = await TodoModel.query()
        .updateAndFetchById(todoId, {
          ...body,
          updatedAt: TodoModel.fn.now(),
        })
        .withGraphFetched("category")
        .throwIfNotFound()

      res.send(updatedTodo)
    },
  ],
  DELETE: [
    auth,
    validate({
      query: {
        todoId: idValidator,
      },
    }),
    async ({
      models: { TodoModel },
      input: {
        query: { todoId },
      },
      res,
    }) => {
      const todo = await TodoModel.query().findById(todoId).throwIfNotFound()

      await todo.$query().delete()

      res.send(todo)
    },
  ],
})

// pour un TODO

export default handle
