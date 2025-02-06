import { Login } from "../module/auth/login";
import { useUser } from "../module/auth/use-user";
import { TodoList } from "../module/todo-list/todo-list";

export function App() {
  const user = useUser();

  if (user.isLoading) {
    return <div>Loading...</div>;
  }

  if (user.data) {
    return <TodoList />;
  }

  return <Login />;
}
