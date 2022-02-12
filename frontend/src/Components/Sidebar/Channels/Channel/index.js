import { useDispatch } from "react-redux";
import styled from "styled-components";
import { SelectChannel } from "../../../../store/Reducers/VariablesReducer/SelectedChannelReducer";

const ChannelWrapper = ({ className, id, user }) => {
  const dispatch = useDispatch();
  return (
    <div
      className={`d-flex flex-row recent-chat align-items-center ${className}`}
      onClick={() => dispatch(SelectChannel(id))}
    >
      <img
        src={`http://127.0.0.1:5000/static/profiles/${user.id}.png`}
        alt=""
        className={`rounded-circle`}
      />
      <div className="d-flex container-fluid ps-2 flex-column justify-content-center description">
        <span className="fs-6 fw text fullname">{user.firstname} {user.lastname}</span>
        <span className="fs-8 fw-light username">@{user.username}</span>
      </div>
    </div>
  );
};

const Channel = styled(ChannelWrapper)`
  padding-left: 8px;
  border-radius: 2px;
  cursor: pointer;

  & .description {
    padding: 8px;
  }

  img {
    height: 40px;
    width: 40px;
    object-fit: cover;
  }

  & .fullname {
    font-size: 0.9rem !important;
    max-width: 14em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #ebebeb;
  }

  & .username {
    font-size: 0.8rem !important;
    color: #c7c6c5;
    max-width: 15.5em;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  &:hover {
    background-color: rgba(255, 255, 255, 0.2);
  }
`;

export default Channel;
