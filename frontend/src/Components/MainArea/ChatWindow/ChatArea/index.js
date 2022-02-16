import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { LoadMessages } from "../../../../store/Reducers/VariablesReducer/MessagesReducer";
import Chat from "./Chat";
import ChatContainer from "./ChatContainer";
import { nanoid } from "nanoid";

const GroupMessages = (messages) => {
  if (!messages.length) {
    return [];
  }
  const data = [];
  var current = [];
  var current_author_id = messages[0].author_id;
  for (var message of messages) {
    if (message.author_id == current_author_id) {
      current.push(message);
    } else {
      data.push(current);
      current_author_id = message.author_id;
      current = [message];
    }
  }

  if (current.length) {
    data.push(current);
  }

  return data.reverse();
};

const ChatAreaWrapper = ({ className }) => {
  const selectedChannelId = useSelector(
    (state) => state.variables.selectedChannel.id
  );
  const user = useSelector((state) => state.auth.user);
  const messages = useSelector((state) => state.variables.messages);
  const [chats, setChats] = useState([]);
  useEffect(() => {
    if (!messages.isFetching) {
      setChats(GroupMessages(messages.data));
    }
  }, [messages.isFetching, messages.data]);
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoadMessages(selectedChannelId));
  }, [selectedChannelId]);
  return (
    <div className={`container-fluid ${className}`}>
      {chats.map((chat) => {
        return (
          <ChatContainer
            key={nanoid()}
            isSender={chat[0].author_id === user.id}
          >
            {chat.map((msg) => (
              <Chat message={msg.content} key={msg.id} />
            ))}
          </ChatContainer>
        );
      })}
    </div>
  );
};

const ChatArea = styled(ChatAreaWrapper)`
  padding: 10px 30px;
  height: calc(100% - var(--chat-out-height));

  display: flex;
  flex-direction: column-reverse;

  overflow-y: scroll;
  overflow-x: hidden;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: transparent;
  }

  &:hover::-webkit-scrollbar-thumb {
    background: #737874;
  }
`;

export default ChatArea;
