import React, { FC, useEffect, useState } from "react";
import { FiCheck } from "react-icons/fi";
import { BiX } from "react-icons/bi";
import { IoEllipsisVertical } from "react-icons/io5";
import { BsFillChatRightDotsFill } from "react-icons/bs";

interface FriendsViewProps {
  page: string;
}

const Search: FC = () => {
  return (
    <input
      type="text"
      className="outline-none w-full m-3 p-2 px-5 rounded-md bg-ui-dark text-gray-200"
      placeholder="Search"
    />
  );
};

interface BaseEntryProps {
  id: string;
  username: string;
  image: string;
}

const BaseEntry: FC<BaseEntryProps> = (props) => {
  return (
    <div className="flex items-center space-x-3">
      <img
        src={props.image}
        alt=""
        className="rounded-full w-12 h-12 object-cover"
      />
      <div className="text-gray-200">{props.username}</div>
    </div>
  );
};

const Button: FC<React.ButtonHTMLAttributes<HTMLButtonElement>> = (props) => {
  return (
    <button
      {...props}
      className={
        "text-2xl text-white rounded-full bg-ui p-2 hover:bg-ui-dark " +
        props.className
      }
    >
      {props.children}
    </button>
  );
};

const FriendEntry: FC<BaseEntryProps> = (props) => {
  return (
    <div className="flex justify-between p-4 hover:bg-ui-transparent-3 rounded-md items-center hover:cursor-pointer">
      <BaseEntry {...props} />
      <div>
        <Button>
          <IoEllipsisVertical />
        </Button>
      </div>
    </div>
  );
};

const PendingEntry: FC<BaseEntryProps> = (props) => {
  return (
    <div className="flex justify-between p-4 hover:bg-ui-transparent-3 rounded-md items-center">
      <BaseEntry {...props} />
      <div className="space-x-2">
        <Button>
          <FiCheck />
        </Button>
        <Button>
          <BiX />
        </Button>
      </div>
    </div>
  );
};

const FriendsView: FC<FriendsViewProps> = (props) => {
  const [entries, setEntries] = useState<any[]>([]);
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=4").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setEntries(data.results);
        });
      }
    });
  }, []);
  return (
    <div className="p-2">
      <Search />
      <div className="font-semibold text-gray-300 text-xs mx-2 p-2">
        {props.page} - {entries.length}
      </div>
      <div>
        {entries.map((entry) => {
          const entryProps = {
            id: entry.login.uuid,
            username: `${entry.name.first} ${entry.name.last}`,
            key: entry.login.uuid,
            image: entry.picture.medium,
          };
          return props.page === "PENDING" ? (
            <PendingEntry {...entryProps} />
          ) : (
            <FriendEntry {...entryProps} />
          );
        })}
        ;
      </div>
    </div>
  );
};

export default FriendsView;
