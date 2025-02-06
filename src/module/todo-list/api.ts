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
  getFetchTodoPage: (
    { page }: { page: number },
    { signal }: { signal: AbortSignal },
  ) => {
    return fetch(`${BASE_URL}/tasks?_page=${page}`, {
      signal,
    }).then((res) => res.json() as Promise<TodoPaginate<TodoDto>>);
  },
};
