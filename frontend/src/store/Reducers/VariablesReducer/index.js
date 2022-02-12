import { combineReducers } from "redux";
import SelectedChannelReducer from "./SelectedChannelReducer";
import ChannelsReducer from "./ChannelsReducer";
import ActivePageReducer from "./ActivePageReducer";
import RelationshipReducer from "./RelationshipReducer";

export default combineReducers({
  selectedChannel: SelectedChannelReducer,
  channels: ChannelsReducer,
  activePage: ActivePageReducer,
  relationships: RelationshipReducer,
});
