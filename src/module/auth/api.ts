import { queryOptions } from "@tanstack/react-query";
import { jsonApiMutationInstance } from "../../shared/api/api-instance";

type UserDto = {
  id: string;
  login: string;
  password: string;
};

export const authApi = {
  baseKey: "users",
  getUserById: (id: string) => {
    return queryOptions({
      queryKey: [authApi.baseKey, { id }],
      queryFn: (meta) =>
        jsonApiMutationInstance<UserDto>(`/users/${id}`, {
          signal: meta.signal,
        }),
    });
  },
  loginUser: ({ login, password }: { login: string; password: string }) => {
    return jsonApiMutationInstance<UserDto[]>(
      `/users?login=${login}&password=${password}`,
    ).then((res) => res[0] as UserDto | null);
  },
};
