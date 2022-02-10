import { useEffect } from "react";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import { LoadRelationships } from "../../../store/Reducers/VariablesReducer/RelationshipReducer";
import Header from "./Header";

const FriendWindowWrapper = ({ className }) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(LoadRelationships());
  }, []);
  return (
    <div className={`container-fluid ${className}`}>
      <Header />
    </div>
  );
};

const FriendWindow = styled(FriendWindowWrapper)`
  padding: 0;
  margin: 0;
`;

export default FriendWindow;
