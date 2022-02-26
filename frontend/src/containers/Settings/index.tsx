import { FC, RefObject, useEffect, useRef } from "react";
import { useNavigate } from "react-router";
import SettingsWindow from './SettingsWindow';

interface SettingsProps {
  appRef: RefObject<HTMLDivElement>;
}

const Settings: FC<SettingsProps> = (props) => {
  const currentElement = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  const componentWillMount = () => {
    props.appRef.current?.classList.add("scaleDown");
    currentElement.current?.classList.add("scaleUp");
  };

  const componentWillUnMount = () => {
    props.appRef.current?.classList.add("scaleUp");
  };

  useEffect(() => {
    componentWillMount();
    return () => {
      componentWillUnMount();
    };
  });

  return (
    <div
      className="flex absolute top-0 w-screen h-screen bg-ui-light"
      ref={currentElement}
    >
      <SettingsWindow/>
      <button
        onClick={() => navigate(-1)}
        className="text-white absolute right-10 top-10 font-light rounded-full border py-3 px-4 border-gray-400 text-sm flex items-center justify-center hover:bg-ui-transparent-5"
      >
        <span>╳</span>
      </button>
    </div>
  );
};

export default Settings;
