import { useAppDispath } from "../../shared/redux";
import { createTodoThunk, useCreateTodoLoading } from "./create-todo-thunk";

export function useCreateTodo() {
  const dispatch = useAppDispath();
  const isLoading = useCreateTodoLoading();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);

    const text = String(formData.get("text") ?? "");

    await dispatch(createTodoThunk(text));

    e.currentTarget.reset();
  };

  return {
    handleSubmit,
    isPanding: isLoading,
  };
}
