import { useInfiniteQuery } from "@tanstack/react-query";
import { todoListApi } from "./api";
import { useIntersentor } from "../../shared/lib";

export function useTodoList() {
  const {
    data: todoItems,
    isLoading,
    error,
    hasNextPage,
    isFetchingNextPage,
    fetchNextPage,
  } = useInfiniteQuery({
    ...todoListApi.getTodoInfinityQueryOptions(),
  });

  const cursorRef = useIntersentor(() => fetchNextPage());

  const cursor = (
    <div ref={cursorRef}>
      {!hasNextPage && "Not download data"}
      {isFetchingNextPage && "Loading..."}
    </div>
  );

  return {
    todoItems: todoItems?.pages.flatMap((todo) => todo.data),
    cursor,
    isLoading,
    error,
  };
}
