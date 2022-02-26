import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";
import { RootState } from "../store";
import { AuthState } from "../store/reducers/AuthReducer";
import { FC } from "react";
import { Route, RouteProps } from "react-router";

interface PrivateRouteProps {
  element: JSX.Element;
}

const PrivateRoute: FC<PrivateRouteProps> = (props) => {
  const { isLoggedIn, isPopulated } = useSelector<RootState, AuthState>(
    (state) => state.auth
  );
  return !isPopulated ? (
    <Outlet />
  ) : isLoggedIn ? (
    props.element
  ) : (
    <Navigate to="/login" />
  );
};

export default PrivateRoute;
