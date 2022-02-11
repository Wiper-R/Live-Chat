import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { ChangeActivePage } from "../../../../store/Reducers/VariablesReducer/ActivePageReducer";
import { RelationshipFilterChanged } from "../../../../store/Reducers/VariablesReducer/RelationshipReducer";

const HeaderWrapper = ({ className }) => {
  const dispatch = useDispatch();
  const activePage = useSelector((state) => {
    return state.variables.activePage;
  });

  const ChangeFilter = (filter) => () => {
    if (activePage[1] !== undefined) {
      dispatch(ChangeActivePage(["FRIENDS"]));
    }
    dispatch(RelationshipFilterChanged(filter));
  };

  const onAddFriendButton = () => {
    if (activePage[1] === undefined) {
      dispatch(ChangeActivePage(["FRIENDS", "ADD_FRIEND"]));
    }
  };

  useEffect(() => {
    const nav_items = document.querySelectorAll(`.friends-nav li`);
    nav_items.forEach((e) => {
      e.addEventListener("click", (e) => {
        nav_items.forEach((e) => {
          e.classList.remove("active");
        });
        e.target.classList.add("active");
      });
    });
  }, []);

  return (
    <div className={`${className}`}>
      <div className="title">
        <i className="fa fa-users me-2 fa-fw" />
        <span>Friends</span>
      </div>
      <ul className="nav friends-nav">
        <li className="active" onClick={ChangeFilter("online")}>
          Online
        </li>
        <li onClick={ChangeFilter("all")}>All</li>
        <li onClick={ChangeFilter("pending")}>Pending</li>
        <li className="add-friend" onClick={onAddFriendButton}>
          Add Friend
        </li>
      </ul>
    </div>
  );
};

const Header = styled(HeaderWrapper)`
  background-color: #292b2f;
  display: flex;
  align-items: center;
  color: white;
  padding: 10px;
  position: relative;
  flex-shrink: 0;
  overflow: hidden;

  i {
    color: #999794;
  }

  .title {
    cursor: default;
    width: fit-content;
    font-weight: 500;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
  }

  .title::after {
    content: "";
    display: block;
    position: relative;
    background-color: gray;
    width: 1.5px;
    left: 15px;
    height: 20px;
  }

  .nav {
    margin-left: 20px;
    flex-shrink: 0;

    li {
      cursor: pointer;
      padding: 3px 8px;
      border-radius: 4px;
      margin-right: 15px;
      font-size: 16px;

      &:not(.add-friend) {
        color: #c8c9cc;
      }

      &:hover {
        background: #36393f;
      }

      &.active {
        color: white;
        background: #36393f;
      }

      &.add-friend {
        color: white;
        background-color: rgb(59, 165, 93);

        &.active {
          background: transparent;
          color: rgb(59, 165, 93);
        }
      }
    }
  }
`;

export default Header;
