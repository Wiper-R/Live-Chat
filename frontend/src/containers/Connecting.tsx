import { FC, useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { RootState } from "../store";

const calculateSecondsLeft = (retryAt: number) => {
  return Math.round((retryAt - new Date().getTime()) / 1000);
};

const Connecting: FC = () => {
  const willRetyAt = useSelector<RootState, number>(
    (state) => state.gateway.willRetryAt
  );
  const [timer, setTimer] = useState<number>(0);
  const [intervalTimer, setIntervalTimer] = useState<NodeJS.Timer>();

  const clearIntervalTimer = (): void => {
    if (intervalTimer) {
      clearInterval(intervalTimer);
    }
  };

  useEffect(() => {
    clearIntervalTimer();
    setIntervalTimer(
      setInterval(() => {
        setTimer(calculateSecondsLeft(willRetyAt));
      }, 1000)
    );
    return () => {
      clearIntervalTimer();
    };
  }, [willRetyAt]);

  return (
    <div className="h-screen flex items-center justify-center flex-col">
      <div className="relative flex items-center justify-center w-40 h-40">
        <div className="absolute border-4 p-6 rounded-full border-t-transparent border-r-transparent animate-spin"></div>
        <div className="absolute border-4 border-pink-300 rounded-full border-b-transparent border-r-transparent p-8 animate-spin"></div>
        <div className="absolute border-4 border-blue-300 rounded-full border-b-transparent border-l-transparent p-10 animate-spin"></div>
        <div className="absolute border-4 border-yellow-300 rounded-full border-t-transparent border-l-transparent p-12 animate-spin"></div>
      </div>
      <div className="text-white text-2xl  font-semibold italic">
        <div className="ellipsis">
          {timer >= 0 ? `Reconnecting in ${timer} Seconds` : "Connecting"}
        </div>
      </div>
    </div>
  );
};

export default Connecting;
