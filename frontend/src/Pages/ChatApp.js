import Sidebar from "../Components/Sidebar";
import ChatWindow from "../Components/MainArea/ChatWindow";
import { useSelector } from "react-redux";
import { useRef } from "react";
import GateWay from "../gateway";
import { useDispatch } from "react-redux";

const ChatApp = () => {
  const gatewayConnected = useRef(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  if (auth.isLoggedIn && !gatewayConnected.current) {
    gatewayConnected.current = true;
    new GateWay(dispatch);
  }

  return (
    <div className="d-flex">
      <Sidebar />
      <ChatWindow />
    </div>
  );
};

export default ChatApp;
