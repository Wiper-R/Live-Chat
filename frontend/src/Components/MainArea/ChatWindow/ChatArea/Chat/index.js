import styled from "styled-components"

const ChatWrapper = ({ className, message }) => {
    return (
        <div className={`chat-wrapper ${className}`}>
            <div className="chat">
                {message}
            </div>
        </div>
    )
}

const Chat = styled(ChatWrapper)`
    color: white;
    width: fit-content;
    max-width: 400px;
    

    .chat{
        border-radius: 0.4em;
        padding: 8px 12px;
        background-color: white;
        color: black;
        margin-bottom: 15px;
    }
`;

export default Chat;