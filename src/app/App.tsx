import { QueryClientProvider } from "@tanstack/react-query";
import { TodoList } from "../module/todo-list/todo-list";
import { queryClient } from "../shared/api/query-client";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TodoList />
    </QueryClientProvider>
  );
}
