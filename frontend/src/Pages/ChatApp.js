import Sidebar from "../Components/Sidebar";
import ChatWindow from "../Components/MainArea/ChatWindow";
import { useSelector } from "react-redux";
import { useRef } from "react";
import GateWay from "../gateway";
import { useDispatch } from "react-redux";
import FriendWindow from "../Components/MainArea/FriendsWindow";

const ChatApp = () => {
  const gatewayConnected = useRef(false);
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const activePage = useSelector((state) => state.variables.activePage);

  if (auth.isLoggedIn && !gatewayConnected.current) {
    gatewayConnected.current = true;
    new GateWay(dispatch);
  }

  const renderElement = () => {
    if (activePage[0] === undefined) {
      return <ChatWindow />;
    } else if (activePage[0] === "FRIENDS") {
      return <FriendWindow />;
    }
  };

  return (
    <div className="ChatApp d-flex">
      <Sidebar />
      {renderElement()}
    </div>
  );
};

export default ChatApp;
