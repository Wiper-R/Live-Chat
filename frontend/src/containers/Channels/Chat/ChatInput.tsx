import { KeyboardEvent, useEffect, useRef, useState } from "react";
import "emoji-mart/css/emoji-mart.css";
import { BaseEmoji, EmojiData, Picker } from "emoji-mart";
import emojis from "./emojis.json";

const ChatInput = () => {
  const [rows, setRows] = useState(1);
  const picker = useRef<Picker>(null);
  const chatInput = useRef<HTMLDivElement>(null);
  const textArea = useRef<HTMLTextAreaElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const [height, setHeight] = useState(0);
  const [counter, setCounter] = useState(Math.random() * emojis.length);
  const [emojiMartActive, setEmojiMartState] = useState(false);

  useEffect(() => {
    if (!chatInput.current || !trigger.current) return;
    document.addEventListener("mouseup", (e) => {
      console.log(!trigger.current?.contains(e.target as Node));
      const emart = chatInput.current?.querySelector(".emoji-mart");
      if (!emart) return;
      if (
        !emart.contains(e.target as Node) &&
        !trigger.current?.contains(e.target as Node)
      ) {
        setEmojiMartState(false);
      }
    });
  }, []);

  const handleTextAreaInput = () => {
    if (!textArea.current) return;
    const value = textArea.current.value;
    const len = value.split("\n").length;
    setRows(Math.min(len, 4));
  };

  const handleTextAreaKeydown = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (!textArea.current) return;
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const content = textArea.current.value;
      if (!content) {
        return;
      }
    }
  };

  function outputsize() {
    if (!textArea.current) return;
    setHeight(textArea.current.offsetHeight);
  }

  useEffect(() => {
    if (textArea.current) {
      new ResizeObserver(outputsize).observe(textArea.current);
    }
  }, [textArea.current]);

  useEffect(() => {
    console.log(picker.current);
  }, [picker.current]);

  const triggerEmojiPicker = () => {
    setEmojiMartState((value) => !value);
  };

  const onEmojiClick = (emoji: EmojiData) => {
    if (!textArea.current) return;
    textArea.current.value += `${(emoji as BaseEmoji).native} `;
  };

  return (
    <div className="flex justify-center p-5 bg-ui-dark relative" ref={chatInput}>
      <textarea
        onInput={handleTextAreaInput}
        className="resize-none outline-none border-none rounded-xl p-2.5 pl-7 scrollbar w-full bg-ui text-gray-200"
        rows={rows}
        ref={textArea}
        onKeyDown={handleTextAreaKeydown}
      />
      {emojiMartActive ? (
        <Picker
          set="google"
          theme="dark"
          onClick={onEmojiClick}
          style={{
            position: "absolute",
            bottom: `${40 + height}px`,
            right: "15px",
          }}
          native={true}
          ref={picker}
        />
      ) : (
        ""
      )}

      <button
        onClick={triggerEmojiPicker}
        className="text-2xl absolute right-8 text-gray-600 mt-1.5"
        onMouseEnter={() =>
          setCounter((value) => value + Math.random() * emojis.length)
        }
        ref={trigger}
      >
        <span id="emoji__input__chat__button" className="block">
          {emojis[Math.round(counter) % emojis.length]}
        </span>
      </button>
    </div>
  );
};

export default ChatInput;
