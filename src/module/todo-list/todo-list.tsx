import { useInfiniteQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";
import { useIntersentor } from "../../shared/lib";

export function TodoList() {
  const {
    data: todoItems,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    queryKey: ["todos", "list"],
    queryFn: (meta) =>
      todoListApi.getFetchTodoPage({ page: meta.pageParam }, meta),
    initialPageParam: 1,
    getNextPageParam: (lastPage) => lastPage.next,
    // для пдготовки данных перед отображением
    select: (data) => data.pages.flatMap((page) => page.data),
  });

  const cursorRef = useIntersentor(() => fetchNextPage());

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {JSON.stringify(error)}</div>;
  }

  return (
    <div className="p-5 mx-auto max-w-[1200px]">
      <h1 className="text-3xl font-bold underline mb-5">TodoList</h1>

      <div>
        {todoItems?.map((todo) => (
          <div
            key={todo.id}
            className={
              "border border-slate-300 rounded p-3 mb-1" +
              (todo.done ? " bg-green-200" : "")
            }
          >
            <span className={todo.done ? " text-slate-400" : ""}>
              {todo.text}
            </span>
          </div>
        ))}
      </div>
      <div ref={cursorRef}>
        {!hasNextPage && "Not download data"}
        {isFetchingNextPage && "Loading..."}
      </div>
    </div>
  );
}
