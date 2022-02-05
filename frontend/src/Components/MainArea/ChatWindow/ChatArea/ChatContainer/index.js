import styled from "styled-components";

const ChatContainerWrapper = ({className, isSender=false, children}) => {
    return (
        <div className={`${className} chat-container` + (isSender ? ' sender' : '')}>
            {children}
        </div>
    )
}


const ChatContainer = styled(ChatContainerWrapper)`
    &:not(.sender) .chat-wrapper:last-child .chat{
        border-bottom-left-radius: 0px;
    }

    &.sender .chat-wrapper{
        margin-left: auto;

        &:last-child .chat{
            border-bottom-right-radius: 0px;
        }

        .chat{
            background-color: #7289da;
            color: white;
        }
    }
`

export default ChatContainer;