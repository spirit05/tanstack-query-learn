import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { PaginationDto, TodoDto, todoListApi } from "./api";

export function useDeleteTodo() {
  const queryClient = useQueryClient();

  const deleteTodoMutation = useMutation({
    mutationFn: todoListApi.deleteTodo,
    async onSettled() {
      queryClient.invalidateQueries(todoListApi.getTodoInfinityQueryOptions());
    },
    async onSuccess(_, deletedId) {
      const todos = queryClient.getQueryData(
        todoListApi.getTodoInfinityQueryOptions().queryKey,
      );

      const newPages = todos?.pages.map((page) => ({
        ...page,
        data: page.data.filter((item) => item.id !== deletedId),
      }));

      const newTodo = { ...todos, page: newPages };

      if (todos) {
        queryClient.setQueryData(
          todoListApi.getTodoInfinityQueryOptions().queryKey,
          newTodo as InfiniteData<PaginationDto<TodoDto>>,
        );
      }
    },
  });

  return {
    handleDelete: deleteTodoMutation.mutate,
    isPanding: deleteTodoMutation.isPending,
    getIsPending: (id: string) =>
      deleteTodoMutation.isPending && deleteTodoMutation.variables === id,
  };
}
