import {
  InfiniteData,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";
import { PaginationDto, TodoDto, todoListApi } from "./api";

export function useToggleTodo() {
  const queryClient = useQueryClient();

  const updateTodoMutation = useMutation({
    mutationFn: todoListApi.updateTodo,
    // optimistic update
    onMutate: async (newTodo) => {
      const queryKey = todoListApi.getTodoInfinityQueryOptions().queryKey;

      await queryClient.cancelQueries({
        queryKey,
      });

      const previuosTodos = queryClient.getQueryData(
        todoListApi.getTodoInfinityQueryOptions().queryKey,
      );

      const newTodosPages = previuosTodos?.pages.map((todo) => ({
        ...todo,
        data: todo.data.map((item) =>
          item.id === newTodo.id ? { ...item, ...newTodo } : item,
        ),
      }));

      const newTodos = { ...previuosTodos, pages: newTodosPages };

      queryClient.setQueryData(
        queryKey,
        newTodos as InfiniteData<PaginationDto<TodoDto>>,
      );

      return { previuosTodos, newTodos };
    },
    onError: (err, newTodo, context) => {
      queryClient.setQueryData(
        todoListApi.getTodoInfinityQueryOptions().queryKey,
        context?.previuosTodos,
      );
    },
    onSettled: () => {
      queryClient.invalidateQueries({
        queryKey: todoListApi.getTodoInfinityQueryOptions().queryKey,
      });
    },
  });

  const toggleTodo = ({ id, done }: { id: string; done: boolean }) => {
    updateTodoMutation.mutate({
      id,
      done: !done,
    });
  };

  return {
    toggleTodo,
  };
}
