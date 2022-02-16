import styled from "styled-components";

const ChatWrapper = ({ className, message }) => {
  return (
    <div className={`chat-wrapper ${className}`}>
      <div className="message">{message}</div>
      <span className="time">22:00</span>
    </div>
  );
};

const Chat = styled(ChatWrapper)`
  transform-style: preserve-3d;
  position: relative;
  color: white;
  width: fit-content;
  max-width: 400px;
  border-radius: 0.25em;
  padding: 10px;
  background-color: var(--bg-color-not-sender);
  color: black;
  margin-bottom: 0.25em;

  // new
  display: flex;
  flex-direction: row;

  .message {
    margin-right: 25px;
    font-size: 1em;
  }

  .time {
    align-self: flex-end;
    margin-right: -5px;
    font-size: 0.8rem;
  }
`;

export default Chat;
