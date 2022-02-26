import { FC } from "react";
import { NavLink } from "react-router-dom";

interface ChannelProps {
  id: string;
  image: string;
  username: string;
  name: string;
}

interface ChannelLogoProps {
  src: string;
}

const ChannelLogo = ({ src }: ChannelLogoProps) => {
  return <img src={src} className="w-14 h-14 rounded-full object-cover" />;
};

const Channel: FC<ChannelProps> = (props) => {
  return (
    <NavLink
      to={`/channels/${props.id}`}
      className={(navdata) =>
        "flex items-center px-1 py-3 hover:bg-ui-transparent-3" + (navdata.isActive ? " bg-ui-transparent-5" : "")
      }
    >
      <ChannelLogo src={`${props.image}`} />
      <div className="flex flex-col w-full ml-2 border-gray-500">
        <span className="text-gray-200">{props.name}</span>
        <span className="text-gray-400">@{props.username}</span>
      </div>
    </NavLink>
  );
};

export default Channel;
