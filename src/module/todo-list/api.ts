import { infiniteQueryOptions, queryOptions } from "@tanstack/react-query";

const BASE_URL = "http://localhost:3000";

type TodoPaginate<T> = {
  data: T[];
  first: number;
  items: number;
  last: number;
  next: number | null;
  prev: number | null;
  page: number;
};

type TodoDto = {
  id: string;
  text: string;
  done: boolean;
};

export const todoListApi = {
  getFetchTodoList: ({ signal }: { signal: AbortSignal }) => {
    return fetch(`${BASE_URL}/tasks`, {
      signal,
    }).then((res) => res.json() as Promise<TodoDto[]>);
  },
  getFetchTodoPage: (
    { page }: { page: number },
    { signal }: { signal: AbortSignal },
  ) => {
    return fetch(`${BASE_URL}/tasks?_page=${page}`, {
      signal,
    }).then((res) => res.json() as Promise<TodoPaginate<TodoDto>>);
  },

  getTodoListQueryOptions: () => {
    return queryOptions({
      queryKey: ["todos", "list"],
      queryFn: todoListApi.getFetchTodoList,
    });
  },
  getTodoListPageQueryOptions: ({ page }: { page: number }) => {
    return queryOptions({
      queryKey: ["todos", "list", { page }],
      queryFn: (meta) => todoListApi.getFetchTodoList({ page }, meta),
    });
  },
  getTodoInfinityQueryOptions: () => {
    return infiniteQueryOptions({
      queryKey: ["todos", "list"],
      queryFn: (meta) =>
        todoListApi.getFetchTodoPage({ page: meta.pageParam }, meta),
      initialPageParam: 1,
      getNextPageParam: (lastPage) => lastPage.next,
      select: (data) => data.pages.flatMap((page) => page.data),
    });
  },
};
