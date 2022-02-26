import { FC } from "react";
import { useParams } from "react-router";
import { Navigate } from "react-router";
import ChatInput from "./ChatInput";
import Header from "./Header";
import Window from "./Window";

const Chat: FC = () => {
  const { id } = useParams();
  if (!id || isNaN(parseInt(id))) {
    return <Navigate to={"/channels/@me"} />;
  }
  return (
    <div className="flex flex-col flex-grow w-0">
      <Header />
      <Window/>
      <ChatInput/>
    </div>
  );
};

export default Chat;
