import { queryClient } from "../../shared/api/query-client";
import { AppThunk } from "../../shared/redux";
import {
  InfiniteData,
  MutationObserver,
  useMutation,
} from "@tanstack/react-query";
import { authSlice } from "../auth/auth.slice";
import { PaginationDto, TodoDto, todoListApi } from "./api";
import { nanoid } from "nanoid";

export const createTodoThunk =
  (text: string): AppThunk =>
  async (dispatch, getState) => {
    const userId = authSlice.selectors.userId(getState());

    if (!userId) {
      throw new Error("User not found");
    }

    const newTodo: TodoDto = {
      id: nanoid(),
      done: false,
      createdAt: Date.now(),
      text,
      userId,
    };

    queryClient.cancelQueries({
      queryKey: todoListApi.getTodoInfinityQueryOptions().queryKey,
    });

    const prevTodos = queryClient.getQueryData(
      todoListApi.getTodoInfinityQueryOptions().queryKey,
    );

    const newTodos = {
      ...prevTodos,
      pages: prevTodos?.pages.map((page) =>
        page.data.length >= 10
          ? page
          : { ...page, data: [...(page.data ?? []), newTodo] },
      ),
    } as InfiniteData<PaginationDto<TodoDto>>;

    queryClient.setQueryData(
      todoListApi.getTodoInfinityQueryOptions().queryKey,
      newTodos,
    );

    try {
      await new MutationObserver(queryClient, {
        mutationFn: todoListApi.createTodo,
      }).mutate(newTodo);
    } catch (e) {
      queryClient.setQueryData(
        todoListApi.getTodoInfinityQueryOptions().queryKey,
        prevTodos,
      );
    } finally {
      queryClient.invalidateQueries({
        queryKey: todoListApi.getTodoInfinityQueryOptions().queryKey,
      });
    }
  };

export const useCreateTodoLoading = () =>
  useMutation({
    mutationKey: ["create-todo"],
  }).isPending;
