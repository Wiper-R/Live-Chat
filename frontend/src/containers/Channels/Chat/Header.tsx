import { FC } from "react";

const Header: FC = () => {
  return (
    <div className="bg-ui-dark">
      <div className="flex items-center p-2">
        <img
          className="w-14 h-14 object-cover rounded-full"
          src="https://randomuser.me/api/portraits/men/90.jpg"
          alt=""
        />
        <div className="flex flex-col">
          <span className="ml-4 text-lg text-white">Leonard Green</span>
          <span className="ml-4 text-gray-400 -mt-1">@Leonard Green</span>
        </div>
      </div>
    </div>
  );
};

export default Header;
