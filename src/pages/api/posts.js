import auth from "@/api/middlewares/auth"
import { validate } from "@/api/middlewares/validate"
import mw from "@/api/mw"
import {
  idValidator,
  pageValidator,
  postsContentValidator,
  postsTitleValidator
} from "@/utils/validators"
import config from "@/web/config"

const handle = mw({
  POST: [
    auth,
    validate({
      body: {
        title: postsTitleValidator,
        content: postsContentValidator,
        authorId: idValidator,
      },
    }),
    async ({
      models: { PostModel },
      input: {
        body: { title, content, authorId },
      },
      res,
    }) => {
      const post = await PostModel.query()
        .insertAndFetch({
          title,
          content,
          authorId,
        })
        .withGraphFetched("user")

      res.send(post)
    },
  ],
  GET: [
    validate({
      query: {
        page: pageValidator.optional(),
      },
    }),
    async ({
      res,
      models: { PostModel },
      input: {
        query: { page },
      },
    }) => {
      const query = PostModel.query()
      const posts = await query
        .clone()
        .withGraphFetched("user")
        .orderBy("createdAt", "DESC")
        .limit(config.ui.itemsPerPage)
        .offset((page - 1) * config.ui.itemsPerPage)
      const [{ count }] = await query.clone().count()

      res.send({
        result: posts,
        meta: {
          count,
        },
      })
    },
  ],
})

export default handle
