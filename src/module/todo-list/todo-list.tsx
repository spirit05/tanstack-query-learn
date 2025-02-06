import { useTodoList } from "./use-todo-list";
import { useCreateTodo } from "./use-create-todo";
import { useDeleteTodo } from "./use-delete-todo";
import { useToggleTodo } from "./use-toggle-todo";

export function TodoList() {
  const { todoItems, isLoading, cursor, error } = useTodoList();

  const createTodo = useCreateTodo();
  const deleteTodo = useDeleteTodo();
  const { toggleTodo } = useToggleTodo();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px]">
      <h1 className="text-3xl font-bold underline mb-5">TodoList</h1>

      <form className="flex gap-2 mb-3" onSubmit={createTodo.handleSubmit}>
        <input
          type="text"
          className="rounded p-2 border border-teal-500"
          name="text"
        />
        <button
          disabled={createTodo.isPanding}
          type="submit"
          className="rounded p-2 border border-teal-500 disabled:opacity-50"
        >
          Создать
        </button>
      </form>

      <div>
        {todoItems?.map((todo) => (
          <div
            key={todo.id}
            onClick={() => toggleTodo(todo)}
            className={
              "border border-slate-300 rounded p-3 mb-1 flex flex-col gap-1 justify-items-start items-start" +
              (todo.done ? " bg-green-200" : "")
            }
          >
            <span className={todo.done ? " text-slate-400" : ""}>
              {todo.text}
            </span>
            <button
              disabled={deleteTodo.getIsPending(todo.id)}
              onClick={() => deleteTodo.handleDelete(todo.id)}
              className="text-rose-500 curdor-pointer font-bold disabled:text-rose-200"
            >
              Удалить
            </button>
          </div>
        ))}
      </div>
      {cursor}
    </div>
  );
}
