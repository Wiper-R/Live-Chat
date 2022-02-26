import { FC, FormEvent, useEffect, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router";
import FormInput from "../components/FormInput";
import request, { ApiError } from "../request";
import { RootState } from "../store";
import { LoadUser } from "../store/reducers/AuthReducer";

const Login: FC = (props) => {
  const dispatch = useDispatch();
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const isLoggedIn = useSelector<RootState, boolean>(
    (state) => state.auth.isLoggedIn
  );

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    request("auth/login", {
      method: "POST",
      json: {
        username: usernameInput.current?.value,
        password: passwordInput.current?.value,
      },
    }).then(
      (_) => {
        dispatch(LoadUser());
      },
      (e: ApiError) => {
        alert(`Login Failed: ${e.message}`);
      }
    );
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-teal-800 to-slate-900">
      <form
        className="flex flex-col px-8 py-7 rounded-md w-80 bg-white justify-center items-center"
        onSubmit={handleSubmit}
      >
        <h2 className="self-start text-lg font-semibold after:w-5 after:h-1 after:relative after:block after:bg-gradient-to-r after:from-teal-800 after:to-slate-900">
          Login
        </h2>
        <FormInput
          type="text"
          placeholder="Enter your username"
          label="Username or Email"
          ref={usernameInput}
        />
        <FormInput
          type="password"
          placeholder="Enter your password"
          label="Password"
          ref={passwordInput}
        />
        <button
          type="submit"
          className="block mt-4 w-full p-2 bg-gradient-to-l from-teal-800 to-slate-700 text-white rounded-md"
        >
          Login
        </button>
      </form>
    </div>
  );
};

export default Login;
