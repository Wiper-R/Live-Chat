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
    if (activePage == "DEFAULT"){
      return <ChatWindow />
    }
    else if (activePage == "FRIENDS_PAGE"){
      return <FriendWindow/>
    }
  }

  return (
      <div className="d-flex height-100">
        <Sidebar />
        {renderElement()}
      </div>
  );
};

export default ChatApp;
