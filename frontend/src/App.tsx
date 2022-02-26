import { FC, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Routes, Route, useNavigate } from "react-router";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./containers/Login";
import { LoadUser } from "./store/reducers/AuthReducer";
import ChatApp from "./containers/ChatApp";
import SignUp from "./containers/SignUp";

const App: FC = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(LoadUser());
  }, []);

  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<SignUp />} />
      <Route path="/*" element={<PrivateRoute element={<ChatApp />} />} />
    </Routes>
  );
};

export default App;
