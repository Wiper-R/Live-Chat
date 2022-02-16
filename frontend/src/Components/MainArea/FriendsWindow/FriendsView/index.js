import styled from "styled-components";
import { FaEllipsisH } from "react-icons/fa";
import { BsFillChatRightDotsFill } from "react-icons/bs";
import { useSelector } from "react-redux";
import { useRef } from "react";
import Http from "../../../../http";
import { useDispatch } from "react-redux";
import { ChannelCreated } from "../../../../store/Reducers/VariablesReducer/ChannelsReducer";
import { ChangeActivePage } from "../../../../store/Reducers/VariablesReducer/ActivePageReducer";
import { SelectChannel } from "../../../../store/Reducers/VariablesReducer/SelectedChannelReducer";

const EntryWrapper = ({ className, isPending = false, to }) => {
  const optionsRef = useRef();
  const dispatch = useDispatch();
  return (
    <div
      className={`${className} d-flex justify-content-between`}
      onClick={(e) => {
        if (!optionsRef.current.contains(e.target)) {
          new Http("channels/@me", "POST", null, {
            recipient_id: to.id,
          })
            .request()
            .then(({ data, error }) => {
              if (!error) {
                dispatch(ChannelCreated(data));
                dispatch(ChangeActivePage([]));
                dispatch(SelectChannel(data.id));
              }
            });
        }
      }}
    >
      <div className="left">
        <img src={to.avatar} alt="" />
        <span>{`${to.firstname} ${to.lastname}`}</span>
      </div>
      <div className="right">
        <button>
          <BsFillChatRightDotsFill />
        </button>
        <button ref={optionsRef}>
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
  const relationships = useSelector((state) => state.variables.relationships);
  return (
    <div className={`container-fluid flex-grow-1 ${className}`}>
      {relationships.data.map((e) => (
        <Entry to={e.to} key={e.id} />
      ))}
    </div>
  );
};

const FriendsView = styled(FreindsViewWrapper)`
  padding: 20px;

  height: 0;

  ::-webkit-scrollbar {
    width: 5px;
  }

  ::-webkit-scrollbar-track {
    background: transparent;
  }

  ::-webkit-scrollbar-thumb {
    background: transparent;
  }

  :hover::-webkit-scrollbar-thumb {
    background: #737874;
  }

  overflow-y: scroll;
  overflow-x: hidden;
`;

export default FriendsView;
