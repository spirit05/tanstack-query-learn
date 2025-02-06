import { useDispatch } from "react-redux";
import { loginThunk, useLoginLoading } from "./login-thunk";
import { useAppSelector } from "../../shared/redux";
import { authSlice } from "./auth.slice";

export function Login() {
  const dispatch = useDispatch();
  const loginError = useAppSelector(authSlice.selectors.loginError);
  const isLoading = useLoginLoading();

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    dispatch(
      loginThunk(
        formData.get("login")?.toString() ?? "",
        formData.get("password")?.toString() ?? "",
      ),
    );
  };
  return (
    <div className="flex mt-20 ml-20 w-[400px]">
      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <h1 className="text-bold text-xl">Login</h1>

        <input
          type="text"
          className="p-5 rounded border border-slate-500"
          name="login"
        />
        <input
          type="password"
          className="p-5 rounded border border-slate-500"
          name="password"
        />
        {loginError && <p className="text-red-500">{loginError}</p>}
        <button
          disabled={isLoading}
          className="p-5 rounded bg-teal-500 text-white disabled:opacity-50"
        >
          Вход
        </button>
      </form>
    </div>
  );
}
