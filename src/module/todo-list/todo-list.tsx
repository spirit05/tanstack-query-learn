import { useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";

export function TodoList() {
  const { data, isLoading, error } = useQuery({
    queryKey: ["todos", "list"],
    queryFn: todoListApi.getFetchTodoList,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[500px]">
      <h1 className="text-3xl font-bold underline mb-5">TodoList</h1>

      {data?.map((todo) => (
        <div
          key={todo.id}
          className={
            "border border-slate-300 rounded p-3 mb-1 flex flex-col gap-1 justify-items-start items-start" +
            (todo.done ? " bg-green-200" : "")
          }
        >
          <span className={todo.done ? " text-slate-400" : ""}>
            {todo.text}
          </span>
        </div>
      ))}
    </div>
  );
}
