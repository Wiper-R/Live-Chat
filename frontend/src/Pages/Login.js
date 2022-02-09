import styled from "styled-components";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { LoadUser } from "../store/Reducers/AuthReducer";

const LoginWrapper = ({ className }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const HandleLogin = (e) => {
    e.preventDefault();
    const email = document.querySelector("#email");
    const password = document.querySelector("#password");

    fetch("http://127.0.0.1:5000/api/auth/login", {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({
        email: email.value,
        password: password.value,
      }),
    }).then((res) => {
      if (res.ok) {
        dispatch(LoadUser());
        navigate("/");
      } else {
        // Some Error occured
      }
    });
  };

  const { isLoggedIn } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn]);

  return (
    <div className={`${className}`}>
      <form action="" id="login__form">
        <h5 className="title">Login</h5>
        <div className="input-container">
          <span className="label">Username or Email</span>
          <input type="text" placeholder="Enter your username" id="email" />
          {/* <span className="error">Enter valid username</span> */}
        </div>
        <div className="input-container">
          <span className="label">Password</span>
          <input
            type="password"
            placeholder="Enter your password"
            id="password"
          />
        </div>
        <button className="button" onClick={HandleLogin}>
          Login
        </button>
      </form>
    </div>
  );
};

const Login = styled(LoginWrapper)`
  min-height: 100vh !important;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgb(2, 0, 36);
  background: linear-gradient(
    90deg,
    rgba(2, 0, 36, 1) 0%,
    rgba(46, 75, 65, 1) 0%,
    rgba(5, 25, 62, 1) 100%
  );

  form {
    padding: 40px;
    border-radius: 5px;
    background-color: white;
    display: flex;
    flex-direction: column;

    .label {
      font-weight: 600;
    }

    .input-container {
      display: flex;
      flex-direction: column;
      margin-bottom: 10px;

      .label + input {
        margin-top: 2px;
      }

      input {
        width: 250px;
        padding: 5px;
        padding-left: 10px;
        border-radius: 5px;
        outline: none;
        border: 1px solid gray;
        box-shadow: 0px 1px 2px 0px gray;
      }
    }

    .button {
      margin-top: 10px;
      padding: 7px;
      outline: none;
      border: none;
      color: white;
      background: rgb(2, 0, 36);
      background: linear-gradient(
        90deg,
        rgba(2, 0, 36, 1) 0%,
        rgba(52, 88, 151, 1) 0%,
        rgba(67, 107, 93, 1) 100%
      );
      text-transform: title;
      font-weight: 600;
      border-radius: 3px;
    }

    .title {
      margin-top: -20px;

      &:after {
        content: "";
        width: 20px;
        height: 3px;
        position: relative;
        display: block;
        background: linear-gradient(
          90deg,
          rgba(2, 0, 36, 1) 0%,
          rgba(46, 75, 65, 1) 0%,
          rgba(5, 25, 62, 1) 100%
        );
      }
    }

    .error {
      color: red;
      font-size: 0.9em;
      font-weight: 500;
      margin-left: 4px;
      margin-top: 2px;
    }
  }
`;

export default Login;
