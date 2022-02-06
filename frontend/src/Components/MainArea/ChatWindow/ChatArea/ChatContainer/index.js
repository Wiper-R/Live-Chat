import styled from "styled-components";

const ChatContainerWrapper = ({className, isSender=false, children}) => {
    return (
        <div className={`${className} chat-container` + (isSender ? ' sender' : '')}>
            {children}
        </div>
    )
}


const ChatContainer = styled(ChatContainerWrapper)`
    --bg-color-not-sender: white;
    --bg-color-sender: #7289da;
    --arrow-offset: -10px;

    &:not(.sender) .chat-wrapper:last-child::before {
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        left: var(--arrow-offset);
        right: auto;
        bottom: 0;
        border: 22px solid;
        border-color: transparent transparent var(--bg-color-not-sender) transparent;  
        transform: translateZ(-1px);         
    }

    &.sender .chat-wrapper{
        margin-left: auto;
        background-color: var(--bg-color-sender);
        color: white;
    }

    &.sender .chat-wrapper:last-child::after{
        content: ' ';
        position: absolute;
        width: 0;
        height: 0;
        left: auto;
        right: var(--arrow-offset);
        bottom: 0;
        border: 22px solid;
        border-color: transparent transparent var(--bg-color-sender) transparent;  
        transform: translateZ(-1px);    
    }


`

export default ChatContainer;