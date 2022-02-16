import styled from "styled-components";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";
import { useState } from "react";
import { BsEmojiSmileFill } from "react-icons/bs";
import { useEffect } from "react";
import Http from "../../../../http";
import { useSelector } from "react-redux";

const ChatOutWrapper = ({ className }) => {
  const selectedChannelId = useSelector(
    (state) => state.variables.selectedChannel.id
  );
  const [emojiPickerState, setemojiPickerState] = useState(false);
  const onEmojiClick = (emoji, _) => {
    const textarea = document.querySelector("#chat__content");
    textarea.value += `${emoji.native} `;
  };

  useEffect(() => {
    document.addEventListener("mouseup", (e) => {
      const emart = document.querySelector(".chat-out .emoji-mart");
      const etrigger = document.querySelector("#emoji__trigger");
      if (!emart.contains(e.target) && !etrigger.contains(e.target)) {
        emart.classList.remove("show");
        setemojiPickerState(false);
      }
    });
  }, []);

  const handleTextAreaInput = (e) => {
    const value = e.target.value;
    const len = value.split("\n").length;
    document.documentElement.style.setProperty(
      "--chat-out-height",
      `${60 + Math.min(len, 4) * 20}px`
    );
  };

  const triggerEmojiPicker = () => {
    const emart = document.querySelector(".chat-out .emoji-mart");
    emart.classList.toggle("show", !emojiPickerState);
    setemojiPickerState(!emojiPickerState);
  };

  const handleTextAreaKeydown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      const textarea = document.querySelector("#chat__content");
      const content = textarea.value;
      if (!content) {
        return;
      }
      new Http(`channels/${selectedChannelId}/messages`, "POST", null, {
        content,
      })
        .request()
        .then(({ data, error }) => {
          if (error) {
            console.log(error);
            return;
          }
          console.log(data);
          textarea.value = "";
        });
    }
  };

  return (
    <div
      className={`${className} chat-out d-flex align-items-center justify-content-center`}
    >
      <textarea
        type="search"
        onInput={handleTextAreaInput}
        id="chat__content"
        onKeyDown={handleTextAreaKeydown}
      />
      <Picker
        set="google"
        theme="dark"
        onClick={onEmojiClick}
        style={{
          position: "absolute",
          bottom: "calc(var(--chat-out-height) + 10px)",
          right: "15px",
        }}
      />
      <button id="emoji__trigger" onClick={triggerEmojiPicker}>
        <BsEmojiSmileFill />
      </button>
    </div>
  );
};

const ChatOut = styled(ChatOutWrapper)`
  width: 100%;
  position: relative;
  height: var(--chat-out-height);
  background-color: #292b2f;
  textarea {
    resize: none;
    outline: none;
    border: none;
    height: calc(var(--chat-out-height) - 30px);
    width: 95%;
    border-radius: 10px;
    padding: 10px;
    padding-left: 30px;
    ::-webkit-scrollbar {
      width: 5px;
    }

    ::-webkit-scrollbar-track {
      background: transparent;
    }

    ::-webkit-scrollbar-thumb {
      background: transparent;
    }

    &:hover::-webkit-scrollbar-thumb {
      background: #737874;
    }
  }

  .emoji-mart {
    display: none;

    &.show {
      display: block;
    }
  }

  #emoji__trigger {
    background-color: transparent;
    color: black;
    position: absolute;
    bottom: 25px;
    right: 40px;
    font-size: 24px;
    outline: none;
    border: none;
    transition: all 0.2s ease-in-out;
  }

  #emoji__trigger:hover {
    color: gray;
  }
`;

export default ChatOut;
