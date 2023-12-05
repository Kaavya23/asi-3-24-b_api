import apiClient from "@/web/services/apiClient"
import { useMutation, useQuery } from "@tanstack/react-query"

// eslint-disable-next-line max-lines-per-function
const IndexPage = () => {
  const {
    isLoading,
    data: todos,
    refetch,
  } = useQuery({
    queryKey: ["todos"],
    queryFn: () => apiClient("/todos").then(({ data }) => data),
  })
  const { mutateAsync: toggleTodo } = useMutation({
    mutationFn: (todo) =>
      apiClient.patch(`/todos/${todo.id}`, {
        isDone: !todo.isDone,
      }),
  })
  const { mutateAsync: deleteTodo } = useMutation({
    mutationFn: (todoId) => apiClient.delete(`/todos/${todoId}`),
  })
  const handleClickToggle = (id) => async () => {
    const todo = todos.find(({ id: todoId }) => todoId === id)
    await toggleTodo(todo)
    await refetch()
  }
  const handleClickDelete = async (event) => {
    const todoId = Number.parseInt(event.target.getAttribute("data-id"), 10)
    await deleteTodo(todoId)
    await refetch()
  }

  if (isLoading) {
    return "Loading..."
  }

  return (
    <table className="w-full">
      <thead>
        <tr>
          {["#", "Description", "Done", "Category", "", "🗑️"].map((label) => (
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
        {todos.map(({ id, description, isDone, category: { name } }) => (
          <tr key={id} className="even:bg-slate-100">
            <td className="p-4">{id}</td>
            <td className="p-4">{description}</td>
            <td className="p-4">{isDone ? "✅" : "❌"}</td>
            <td className="p-4">{name}</td>
            <td className="p-4">
              <button onClick={handleClickToggle(id)}>Toggle</button>
            </td>
            <td className="p-4">
              <button data-id={id} onClick={handleClickDelete}>
                Delete
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default IndexPage
