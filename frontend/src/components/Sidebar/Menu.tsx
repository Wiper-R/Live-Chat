import { FC } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../../store";
import { AuthState } from "../../store/reducers/AuthReducer";
import { BsGearFill } from "react-icons/bs";
import { FaUserFriends } from "react-icons/fa";
import { Link } from "react-router-dom";
import Tooltip from "../Tooltip";

const Menu: FC = (props) => {
  const { user } = useSelector<RootState, AuthState>((state) => state.auth);
  return (
    <div className="flex px-1 py-2 bg-ui-dark justify-between items-center">
      <div className="flex items-center">
        <img
          src={user?.avatar}
          className="h-12 w-12 object-cover rounded-full"
        />
        <div className="flex flex-col ml-2 flex-grow">
          <span className="text-gray-100 w-40 overflow-ellipsis overflow-hidden whitespace-nowrap">
            {user?.firstname} {user?.lastname}
          </span>
          <span className="text-gray-400 text-sm w-40 overflow-ellipsis overflow-hidden whitespace-nowrap">
            @{user?.username}
          </span>
        </div>
      </div>
      <div className="flex text-white space-x-4 mr-2 text-lg">
        {/* <Link to="/channels/@me">
          <FaUserFriends />
        </Link> 
        
        <Link to="/settings">
          <BsGearFill />
        </Link>
        */}
        <Tooltip alignment="top" text="Friends">
          <Link to="/channels/@me">
            <FaUserFriends />
          </Link>
        </Tooltip>
        <Tooltip alignment="top" text="Settings">
          <Link to="/settings">
            <BsGearFill />
          </Link>
        </Tooltip>
      </div>
    </div>
  );
};

export default Menu;
