import { FC, useEffect, useState } from "react";
import Channel from "./Channel";
import Menu from "./Menu";

// Sidebar Search Component
const SidebarSearch: FC = () => {
  return (
    <div className="flex justify-center shadow shadow-ui-transparent-5">
      <input
        type="text"
        className="outline-none w-full m-3 p-1 px-3 rounded-md bg-ui-dark text-white"
        placeholder="Search a chat"
      />
    </div>
  );
};

// Sidebar Channels
const SidebarChannels: FC = () => {
  const [channels, setChannels] = useState<any[]>([]);
  useEffect(() => {
    fetch("https://randomuser.me/api/?results=4").then((res) => {
      if (res.ok) {
        res.json().then((data) => {
          setChannels(data.results);
        });
      }
    });
  }, []);
  return (
    <div className="flex-grow h-0 overflow-x-hidden overflow-y-scroll scrollbar">
      {channels.map((data, idx) => (
        <Channel
          id={idx.toString()}
          image={data.picture.thumbnail}
          username={data.login.username}
          name={`${data.name.first} ${data.name.last}`}
          key={data.login.uuid}
        />
      ))}
    </div>
  );
};

const Sidebar: FC = (props) => {
  return (
    <div className="bg-ui w-80 h-screen shadow shadow-ui-transparent-5 flex flex-col">
      <SidebarSearch />
      <SidebarChannels />
      <Menu />
    </div>
  );
};

export default Sidebar;
