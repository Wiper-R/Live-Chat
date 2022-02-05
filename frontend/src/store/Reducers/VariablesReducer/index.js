import { combineReducers } from "redux";
import SelectedChatReducer from "./SelectedChatReducer";
import RecentChatsReducer from "./RecentChatsReducer";


export default combineReducers(
    {
        selectedChat: SelectedChatReducer,
        recentChats: RecentChatsReducer,
    }
);