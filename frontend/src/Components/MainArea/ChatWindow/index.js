import styled from "styled-components";
import TopArea from "./TopArea";
import ChatArea from "./ChatArea";
import ChatOut from "./ChatOut";
import { useSelector } from "react-redux";

const Wrapper = () => {
    return (
        <>
            <TopArea />
            <div className="chat-area-wrapper">
                <ChatArea />
                <ChatOut />
            </div>
        </>
    )
}

const ChatWindowWrapper = ({ className }) => {
    const selectedChatId = useSelector(state => state.variables.selectedChat.id);
    return (
        <div className={`container-fluid d-flex flex-column ${className} p-0`}>
            {
                selectedChatId ? <Wrapper/> : <></>
            }
        </div>
    )
}


const ChatWindow = styled(ChatWindowWrapper)`
    background-color: #36393f;

    .chat-area-wrapper{
        height: calc(100vh - 60px);
    }

`


export default ChatWindow;