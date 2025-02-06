import { QueryClientProvider } from "@tanstack/react-query";
import { TodoList } from "../module/todo-list/todo-list";
import { queryClient } from "../shared/api/query-client";
import { Provider } from "react-redux";
import { store } from "../shared/redux";

export function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Provider store={store}>
        <TodoList />
      </Provider>
    </QueryClientProvider>
  );
}
