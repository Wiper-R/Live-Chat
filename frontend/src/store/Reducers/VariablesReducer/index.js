import { combineReducers } from "redux";
import SelectedChatReducer from "./SelectedChatReducer";
import ChannelsReducer from "./ChannelsReducer";
import ActivePageReducer from "./ActivePageReducer";



export default combineReducers(
    {
        selectedChat: SelectedChatReducer,
        Channels: ChannelsReducer,
        activePage: ActivePageReducer
    }
);