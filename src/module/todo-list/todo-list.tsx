import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";
import { useState } from "react";

export function TodoList() {
  const [page, setPage] = useState(1);

  const {
    data: todoItems,
    isLoading,
    error,
    isPlaceholderData,
  } = useQuery({
    queryKey: ["todos", "list", { page }],
    queryFn: (meta) => todoListApi.getFetchTodoPage({ page }, meta),
    placeholderData: keepPreviousData,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px]">
      <h1 className="text-3xl font-bold underline mb-5">TodoList</h1>

      <div className={isPlaceholderData ? " opacity-40" : ""}>
        {todoItems?.data.map((todo) => <div key={todo.id}>{todo.text}</div>)}
      </div>
      <div>
        <button
          onClick={() => setPage((p) => Math.max(p - 1, 0))}
          className="p-3 rounded text-blue-400 cursor-pointer"
        >
          Prev
        </button>
        <button
          onClick={() => setPage((p) => p + 1)}
          className="p-3 rounded text-blue-400 cursor-pointer"
        >
          Next
        </button>
      </div>
    </div>
  );
}
