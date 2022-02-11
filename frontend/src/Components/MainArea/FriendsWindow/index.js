import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { LoadRelationships } from "../../../store/Reducers/VariablesReducer/RelationshipReducer";
import AddFriend from "./AddFriend";
import Header from "./Header";

const FriendWindowWrapper = ({ className }) => {
  const dispatch = useDispatch();
  const activePage = useSelector((state) => state.variables.activePage[1]);
  useEffect(() => {
    dispatch(LoadRelationships());
  }, []);

  const renderElement = () => {
    if (activePage === "ADD_FRIEND") {
      return <AddFriend />;
    }
  };
  return (
    <div className={`container-fluid ${className}`}>
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
