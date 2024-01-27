import { formatDateTimeShort } from "@/utils/formatters"
import Loader from "@/web/components/ui/Loader"
import Pagination from "@/web/components/ui/Pagination"
import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"
import { useRouter } from "next/router"

export const getServerSideProps = async ({ query: { page } }) => {
  const data = await apiClient("/posts", { params: { page } })

  return {
    props: { initialData: data },
  }
}
// eslint-disable-next-line max-lines-per-function
const PostPage = ({ initialData }) => {
  const { query } = useRouter()
  const page = Number.parseInt(query.page || 1, 10)
  const {
    isFetching,
    data: {
      result: posts,
      meta: { count },
    },
    refetch,
  } = useQuery({
    queryKey: ["posts", page],
    queryFn: () => apiClient("/posts", { params: { page } }),
    initialData,
    enabled: false,
  })
  // const { mutateAsync: toggleTodo } = useMutation({
  //   mutationFn: (todo) =>
  //     apiClient.patch(`/todos/${todo.id}`, {
  //       isDone: !todo.isDone,
  //     }),
  // })
  // const { mutateAsync: deleteTodo } = useMutation({
  //   mutationFn: (todoId) => apiClient.delete(`/todos/${todoId}`),
  // })
  // const handleClickToggle = (id) => async () => {
  //   const todo = todos.find(({ id: todoId }) => todoId === id)
  //   await toggleTodo(todo)
  //   await refetch()
  // }
  // const handleClickDelete = async (event) => {
  //   const todoId = Number.parseInt(event.target.getAttribute("data-id"), 10)
  //   await deleteTodo(todoId)
  //   await refetch()
  // }

  return (
    <div className="relative">
      {isFetching && <Loader />}
      <table className="w-full">
        <thead>
          <tr>
            {[
              "#",
              "User",
              "Title",
              "Content",
              "Created At",
              //"",
              //"🗑️",
            ].map((label) => (
              <td
                key={label}
                className="p-4 bg-slate-300 text-center font-semibold"
              >
                {label}
              </td>
            ))}
          </tr>
        </thead>
        <tbody>
          {posts.map(
            ({ id, user: { username }, title, content, createdAt }) => (
              <tr key={id} className="even:bg-slate-100">
                <td className="p-4">{id}</td>
                <td className="p-4">{username}</td>
                <td className="p-4">{title}</td>
                <td className="p-4">{content}</td>
                <td className="p-4">
                  {formatDateTimeShort(new Date(createdAt))}
                </td>
              </tr>
            ),
          )}
        </tbody>
      </table>
      <Pagination count={count} page={page} className="mt-8" />
    </div>
  )
}

export default PostPage
