import Sidebar from '../Components/Sidebar';
import ChatWindow from '../Components/MainArea/ChatWindow';
import { useSelector } from 'react-redux';


const ChatApp = () => {
    const auth = useSelector(state => state.auth)
    
    const websocket = new WebSocket('ws://127.0.0.1:5000/ws');
    
    if (auth.isPopulated){
        console.log("Populated");

    }

    // Handles Websocket Events
    websocket.addEventListener(
        'open', (event) => {
            console.log(event);
            console.log("Connection Success");
        }
    )

    return (
    <div className="d-flex">
        <Sidebar />
        <ChatWindow />
    </div>
    )
}

export default ChatApp;