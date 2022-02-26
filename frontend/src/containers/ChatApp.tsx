import { FC, useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, Route, Routes } from "react-router";
import Sidebar from "../components/Sidebar";
import { RootState } from "../store";
import { AuthState } from "../store/reducers/AuthReducer";
import {
  Gateway,
  GatewayStateInterface,
} from "../store/reducers/GatewayReducer";
import Channels from "./Channels";
import Connecting from "./Connecting";
import Settings from "./Settings";

const ChatApp: FC = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const appRef = useRef<HTMLDivElement>(null);
  const auth = useSelector<RootState, AuthState>((state) => state.auth);
  const gateway = useSelector<RootState, GatewayStateInterface>(
    (state) => state.gateway
  );

  useEffect(() => {
    if (!auth.isLoggedIn && auth.isPopulated) {
      navigate("/login");
    }
  }, [auth]);

  useEffect(() => {
    if (!gateway.initiated) {
      dispatch(new Gateway().GatewayInit);
    }
  }, [gateway.initiated]);

  useEffect(() => {
    appRef.current?.addEventListener("animationend", (e: AnimationEvent) => {
      appRef.current?.classList.remove(e.animationName);
    });
  }, []);

  return (
    <div className="bg-ui-light">
      {!gateway.ws ? (
        <Connecting />
      ) : (
        <>
          <div className="flex" ref={appRef}>
            <Sidebar />
            <Routes>
              <Route path="/channels/*" element={<Channels />} />
            </Routes>
          </div>
          <Routes>
            <Route path="/settings/*" element={<Settings appRef={appRef} />} />
          </Routes>
        </>
      )}
    </div>
  );
};

export default ChatApp;
