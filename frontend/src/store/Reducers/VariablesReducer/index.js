import { combineReducers } from "redux";
import SelectedChatReducer from "./SelectedChatReducer";
import ChannelsReducer from "./ChannelsReducer";


export default combineReducers(
    {
        selectedChat: SelectedChatReducer,
        Channels: ChannelsReducer,
    }
);