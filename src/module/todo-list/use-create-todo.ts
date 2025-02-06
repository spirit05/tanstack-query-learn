import { useMutation, useQueryClient } from "@tanstack/react-query";
import { todoListApi } from "./api";
import { nanoid } from "nanoid";

export function useCreateTodo() {
  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: todoListApi.createTodo,
    async onSettled() {
      await queryClient.invalidateQueries(
        todoListApi.getTodoInfinityQueryOptions(),
      );
    },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const text = String(formData.get("text") ?? "");

    createTodoMutation.mutate({
      id: nanoid(),
      done: false,
      createdAt: Date.now(),
      text,
    });

    e.currentTarget.reset();
  };

  return {
    handleSubmit,
    isPanding: createTodoMutation.isPending,
  };
}
