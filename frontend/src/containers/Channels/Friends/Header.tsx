import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { nanoid } from "nanoid";
import { FaUserFriends } from "react-icons/fa";

interface ButtonProps {
  text: string;
  changePage: Dispatch<SetStateAction<string>>;
  page: string;
  activePage: string;
}

const Button: FC<ButtonProps> = (props) => {
  return (
    <button
      onClick={(_) => props.changePage(props.page)}
      className={
        "px-2 font-semibold rounded text-gray-300 " +
        (props.page === props.activePage
          ? "bg-ui-transparent-5 text-white"
          : "")
      }
    >
      {props.text}
    </button>
  );
};

interface HeaderProps {
  page: string;
  changePage: Dispatch<SetStateAction<string>>;
}

const ButtonsMapping = [
  // { text: "Online", page: "ONLINE", key: nanoid() },
  { text: "All", page: "ALL", key: nanoid() },
  { text: "Pending", page: "PENDING", key: nanoid() },
  { text: "Add Friend", page: "ADD_FRIEND", key: nanoid() },
];

const Header: FC<HeaderProps> = (props) => {
  const { changePage } = props;
  const activePage = props.page;

  useEffect(() => {
    console.log(activePage);
  }, [activePage]);

  return (
    <div className="flex items-center">
      <div className="flex justify-between items-center">
        <FaUserFriends className="text-gray-300 text-lg" />
        <span className="ml-2 text-lg font-semibold text-white">Friends</span>
      </div>
      <div>
        <div className="h-5 w-px mx-5 bg-gray-400"></div>
      </div>
      <div className="space-x-3">
        {ButtonsMapping.map((value) => (
          <Button
            text={value.text}
            changePage={changePage}
            key={value.key}
            page={value.page}
            activePage={activePage}
          />
        ))}
      </div>
    </div>
  );
};

export default Header;
