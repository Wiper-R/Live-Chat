import styled from "styled-components";
import Chat from "./Chat";
import ChatContainer from "./ChatContainer";

const ChatAreaWrapper = ({ className }) => {
  return (
    <div className={`container-fluid ${className}`}>
      <ChatContainer>
        <Chat message={"This is a test"} />
        <Chat message={"This is a test"} />
        <Chat message={"This is a test"} />
        <Chat message={"I"} />
      </ChatContainer>
      <ChatContainer isSender={true}>
        <Chat message={"This is a test"} />
        <Chat message={"This is a test"} />
        <Chat message={"This is a test"} />
        <Chat message={"This is a test"} />
      </ChatContainer>
      <ChatContainer>
        <Chat message={"This is a test"} />
        <Chat message={"This is a test"} />
        <Chat message={"This is a test"} />
        <Chat
          message={
            "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Proin ultrices dui sit amet elit elementum congue. Nunc sagittis metus ex, eu vehicula velit tempor at. Nullam et vestibulum nisi. Vestibulum fringilla, diam quis cursus efficitur, nunc libero efficitur nisi, sit."
          }
        />
      </ChatContainer>
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
