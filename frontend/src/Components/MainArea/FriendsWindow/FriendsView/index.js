import styled from "styled-components";
import { FaEllipsisH } from "react-icons/fa";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { useSelector } from "react-redux";

const EntryWrapper = ({ className, isPending=false, to }) => {
  return (
    <div className={`${className} d-flex justify-content-between`}>
      <div className="left">
        <img src="http://127.0.0.1:5000/static/profiles/default.png" alt="" />
        <span>{`${to.firstname} ${to.lastname}`}</span>
      </div>
      <div className="right">
        <button>
          <BsFillChatRightDotsFill />
        </button>
        <button>
          <FaEllipsisH />
        </button>
      </div>
    </div>
  );
};

const Entry = styled(EntryWrapper)`
  position: relative;
  cursor: pointer;
  &:before {
    position: absolute;
    display: block;
    height: 0.5px;
    width: 98%;
    left: 10px;
    top: -1px;
    content: "";
    background: rgba(107, 107, 107, 0.3);
  }

  padding: 10px;
  border-radius: 8px;
  &:hover {
    background-color: rgba(135, 132, 132, 0.3);
  }
  img {
    width: 50px;
    height: 50px;
    object-fit: cover;
    border-radius: 50%;
  }

  .left {
    span {
      color: white;
      margin-left: 1em;
    }
  }

  .right {
    display: flex;
    justify-content: center;
    align-items: center;

    button {
      padding: 5px 10px;
      color: #d4d6d9;
      background: #4a4b4d;
      outline: none;
      border: none;
      font-size: 18px;
      border-radius: 50%;

      &:last-child {
        margin-left: 10px;
      }

      &:hover {
        color: white;
      }
    }
  }

  &:hover {
    .right button {
      background-color: #282829;
    }
  }
`;

const FreindsViewWrapper = ({ className }) => {
    const relationships = useSelector(state => state.variables.relationships);
  return (
    <div className={`container-fluid ${className}`}>
        {
            relationships.data.map((e) => <Entry to={e.to}/>)
        }
    </div>
  );
};

const FriendsView = styled(FreindsViewWrapper)`
  padding: 20px;
`;

export default FriendsView;
