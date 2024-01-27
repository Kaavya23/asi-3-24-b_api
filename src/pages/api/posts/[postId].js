import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  idValidator,
  postsContentValidator,
  postsTitleValidator,
} from "@/utils/validators"

const handle = mw({
  GET: [
    validate({
      query: {
        postId: idValidator,
      },
    }),
    async ({
      models: { PostModel },
      input: {
        query: { postId },
      },
      res,
    }) => {
      const post = await PostModel.query().findById(postId).throwIfNotFound()

      res.send(post)
    },
  ],
  PATCH: [
    auth,
    validate({
      query: {
        postId: idValidator,
      },
      body: {
        title: postsTitleValidator.optional(),
        authorId: idValidator.optional(),
        content: postsContentValidator.optional(),
      },
    }),
    async ({
      models: { PostModel },
      input: {
        body,
        query: { postId },
      },
      res,
    }) => {
      const updatedPost = await PostModel.query()
        .updateAndFetchById(postId, {
          ...body,
          updatedAt: PostModel.fn.now(),
        })
        .withGraphFetched("user")
        .throwIfNotFound()

      res.send(updatedPost)
    },
  ],
  DELETE: [
    auth,
    validate({
      query: {
        postId: idValidator,
      },
    }),
    async ({
      models: { PostModel },
      input: {
        query: { postId },
      },
      res,
    }) => {
      const post = await PostModel.query().findById(postId).throwIfNotFound()

      await post.$query().delete()

      res.send(post)
    },
  ],
})

export default handle
