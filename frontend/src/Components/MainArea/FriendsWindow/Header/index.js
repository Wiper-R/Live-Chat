import { useEffect } from "react";
import styled from "styled-components";

const HeaderWrapper = ({className}) => {
    useEffect(() => {
        const nav_items = document.querySelectorAll(`.${className} .nav li`);
        console.log(nav_items);
    })

  return (
    <div className={`${className}`}>
      <div className="title">
        <i className="fa fa-users me-2 fa-fw" />
        <span>Friends</span>
      </div>
      <ul className="nav">
          <li className="active">Online</li>
          <li>All</li>
          <li>Pending</li>
          <li className="add-friend">
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

i{
    color: #999794;
}

.title{
    cursor: default;
    width: fit-content;
    font-weight: 500;
    padding: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 18px;
}

.title::after{
    content: "";
    display: block;
    position: relative;
    background-color: gray;
    width: 1.5px;
    left: 15px;
    height: 20px;
}

.nav{
    margin-left: 20px;
    flex-shrink: 0;

    li{
        cursor: pointer;
        padding: 3px 8px;
        border-radius: 4px;
        margin-right: 15px;
        font-size: 16px;

        &:not(.add-friend){
            color: #c8c9cc;
        }

        &:hover{
            background: #36393f;
        }

        &.active{
            color: white;
            background: #36393f;
        }

        &.add-friend{
            color: white;
            background-color: rgb(59, 165, 93);

            &.active{
                background: transparent;
                color: rgb(59, 165, 93);
            }
        }
    }
}
`;


export default Header;