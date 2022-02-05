import { useSelector } from "react-redux";
import styled from "styled-components";

const TopAreaSkeletonWrapper = ({ className }) => {
  return (
    <div className={`user d-flex align-items-center ${className}`}>
      <span className="avatar skeleton"></span>
      <span className="fullname skeleton"></span>
    </div>
  );
};

const TopAreaSkeleton = styled(TopAreaSkeletonWrapper)`
  .avatar {
    height: 35px;
    width: 35px;
    object-fit: cover;
    display: block;
    border-radius: 50%;
  }

  .fullname {
    height: 10px;
    width: 140px;
    display: block;
  }
`;

const TopAreaWrapper = ({ className }) => {
  const selectedChat = useSelector((state) => state.variables.selectedChat);
  console.log(selectedChat);
  return (
    <div
      className={`p-2 d-flex ${className} justify-content-between align-items-center`}
    >
      {!selectedChat.isFetching ? (
        <div className="user d-flex align-items-center">
          <img
            src={`http://127.0.0.1:5000/static/profiles/${selectedChat.id}.png`}
            alt=""
            className="avatar rounded-circle"
          />
          <span className="fullname">{`${selectedChat.user.firstname} ${selectedChat.user.lastname}`}</span>
        </div>
      ) : (
        <TopAreaSkeleton />
      )}

      <div className="top-nav">
        <button className="btn btn-transparent text-white">
          <i className="fa fa-search"></i>
        </button>
      </div>
    </div>
  );
};

const TopArea = styled(TopAreaWrapper)`
  background-color: #292b2f;
  height: 60px;
  .user {
    .avatar {
      height: 35px;
      width: 35px;
      object-fit: cover;
    }

    .fullname {
      font-weight: 400;
      margin-left: 10px;
      color: white;
      font-size: 0.9rem;
    }
  }

  .top-nav .btn {
    box-shadow: none;
  }
`;

export default TopArea;
