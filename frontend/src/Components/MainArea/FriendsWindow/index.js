import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { LoadRelationships } from "../../../store/Reducers/VariablesReducer/RelationshipReducer";
import AddFriend from "./AddFriend";
import FriendsView from "./FriendsView";
import Header from "./Header";

const FriendWindowWrapper = ({ className }) => {
  const dispatch = useDispatch();
  const activePage = useSelector((state) => state.variables.activePage);
  useEffect(() => {
    dispatch(LoadRelationships());
  }, []);

  const renderElement = () => {
    if (activePage[1] === "ADD_FRIEND") {
      return <AddFriend />;
    } else {
      return <FriendsView />;
    }
  };
  return (
    <div className={`container-fluid d-flex flex-column ${className}`}>
      <Header />
      {renderElement()}
    </div>
  );
};

const FriendWindow = styled(FriendWindowWrapper)`
  background-color: #36393f;
  padding: 0;
  margin: 0;
`;

export default FriendWindow;
