import { combineReducers } from "redux";
import SelectedChat from "./SelectedChatReducer";
import RecentChatsReducer from "./RecentChatsReducer";


export default combineReducers(
    {
        selectedChat: SelectedChat,
        recentChats: RecentChatsReducer,
    }
);