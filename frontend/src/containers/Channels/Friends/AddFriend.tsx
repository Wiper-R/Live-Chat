import { FC, useEffect, useRef, useState } from "react";

const AddFriend: FC = () => {
  const inputRef = useRef<HTMLInputElement>(null);
  const [disabled, setDisabled] = useState(true);

  const inputisEmpty = (): boolean => {
    if (!inputRef.current) return true;
    return inputRef.current.value === "";
  };

  useEffect(() => {
    if (!inputRef.current) return;
    inputRef.current.addEventListener("input", () => {
      setDisabled(inputisEmpty());
    });
  }, []);

  return (
    <div className="flex flex-col p-8">
      <h5 className="text-white uppercase">Add Friend</h5>
      <p className="text-gray-300 font-light text-sm mt-1">
        You can add a friend with their username. It's cAsE sEnSiTiVe!
      </p>
      <div className="flex items-center shrink-0 overflow-hidden w-[900px] relative mt-4">
        <input
          placeholder="Enter a Username"
          ref={inputRef}
          type="text"
          className="w-full p-3.5 rounded-xl outline-none border bg-[#303238] border-[#212326] text-white pl-5 pr-44 focus:border-sky-500"
        />
        <button
          className={
            "whitespace-pre outline-none border-none px-2 py-2.5 rounded text-sm mr-2.5 absolute right-0 bg-[#5865f2] text-white " +
            (disabled ? "opacity-50" : "")
          }
          disabled={disabled}
        >
          Send Friend Request
        </button>
      </div>
      <span></span>
    </div>
  );
};

export default AddFriend;
