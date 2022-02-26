import { useRef, useState, useEffect, FormEventHandler, FormEvent } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router";
import isEmail from "validator/lib/isEmail";
import FormInput from "../components/FormInput";
import { FC } from "react";
import { RootState } from "../store";

const SignUp: FC = () => {
  const usernameInput = useRef<HTMLInputElement>(null);
  const passwordInput = useRef<HTMLInputElement>(null);
  const passwordRetypeInput = useRef<HTMLInputElement>(null);
  const firstnameInput = useRef<HTMLInputElement>(null);
  const lastnameInput = useRef<HTMLInputElement>(null);
  const emailInput = useRef<HTMLInputElement>(null);
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
  }

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-teal-800 to-slate-900">
      <form
        className="flex flex-col px-8 py-7 rounded-md bg-white justify-center items-center"
        noValidate={true}
        onSubmit={handleSubmit}
      >
        <h2 className="self-start text-lg font-semibold after:w-5 after:h-1 after:relativ after:block after:bg-gradient-to-r after:from-teal-800 after:to-slate-900">
          SignUp
        </h2>
        <div className="grid grid-cols-1 gap-x-6 gap-y-2">
          <FormInput
            type="text"
            placeholder="Enter your firstname"
            label="Firstname"
            ref={firstnameInput}
          />
          <FormInput
            type="text"
            placeholder="Enter your lastname"
            label="Lastname"
            ref={lastnameInput}
          />
          <FormInput
            type="email"
            placeholder="Enter your email"
            label="Email"
            ref={emailInput}
          />
          <FormInput
            type="text"
            placeholder="Enter your username"
            label="Username"
            ref={usernameInput}
          />
          <FormInput
            type="password"
            placeholder="Enter your password"
            label="Password"
            ref={passwordInput}
          />
          <FormInput
            type="password"
            placeholder="Retype your password"
            label="Password (Retype)"
            ref={passwordRetypeInput}
          />
        </div>
        <button
          type="submit"
          className="block mt-4 w-full p-2 bg-gradient-to-l from-teal-800 to-slate-700 text-white rounded-md"
        >
          SignUp
        </button>
      </form>
    </div>
  );
};

export default SignUp;
