import styled from "styled-components";
import Header from "./Header";


const FriendWindowWrapper = ({className}) => {
  return (
  <div className={`container-fluid ${className}`}>
    <Header/>
  </div>
  );
};

const FriendWindow = styled(FriendWindowWrapper)`
padding: 0;
margin: 0;
`;

export default FriendWindow;
