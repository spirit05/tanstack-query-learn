import { infiniteQueryOptions } from "@tanstack/react-query";
import { jsonApiMutationInstance } from "../../shared/api/api-instance";

export type PaginationDto<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  prev: number | null;
  page: number;
};

export type TodoDto = {
  id: string;
  text: string;
  done: boolean;
  createdAt: number;
};

export const todoListApi = {
  getTodoInfinityQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ["todos", "list"],
      queryFn: (meta) =>
        jsonApiMutationInstance<PaginationDto<TodoDto>>(
          `/tasks?_page=${meta.pageParam}`,
          {
            signal: meta.signal,
          },
        ),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => {
        return lastPage.next ? lastPage.next : undefined;
      },
    });
  },

  createTodo: (data: TodoDto) => {
    return jsonApiMutationInstance<TodoDto>(`/tasks`, {
      method: "POST",
      json: data,
    });
  },
  updateTodo: (data: Partial<TodoDto> & { id: string }) => {
    return jsonApiMutationInstance<TodoDto>(`/tasks/${data.id}`, {
      method: "PATCH",
      json: data,
    });
  },
  deleteTodo: (id: string) => {
    return jsonApiMutationInstance(`/tasks/${id}`, {
      method: "DELETE",
    });
  },
};
