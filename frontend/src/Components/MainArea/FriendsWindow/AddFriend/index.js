import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import Http from "../../../../http";

const AddFriendWrapper = ({ className }) => {
  const [disabled, setDisabled] = useState(true);
  const messageRef = useRef();
  useEffect(() => {
    messageRef.current.style.display = "none";
    const add_friend_input = document.querySelector("#add_friend_input");
    add_friend_input.value = sessionStorage.getItem("add_friend_input") || "";
    if (add_friend_input.value) {
      setDisabled(false);
    }
    add_friend_input.addEventListener("input", (e) => {
      ResetMessage();
      var value = e.target.value.replace(" ", "");
      sessionStorage.setItem("add_friend_input", value);
      e.target.value = value;
      if (value && disabled) {
        return setDisabled(false);
      } else {
        setDisabled(true);
      }
    });
  }, []);

  const ResetMessage = () => {
    messageRef.current.innerText = "";
    messageRef.current.style.display = "none";
    messageRef.current.classList.remove("success");
    messageRef.current.classList.remove("error");
  };

  const HandleSubmit = (e) => {
    ResetMessage();
    const username = document.querySelector("#add_friend_input").value;
    new Http("relationships/@me", "POST", null, { username })
      .request()
      .then(({ data, error }) => {
        messageRef.current.style.display = "block";

        if (error) {
          messageRef.current.classList.add("error");
          messageRef.current.innerText = error.message;
          return;
        }

        messageRef.current.classList.add("success");
        messageRef.current.innerHTML = `Success! Your friend request to <b>${data.to.firstname} ${data.to.lastname}</b> was sent.`;
      });
  };

  return (
    <div className={`container-fluid d-flex flex-column ${className}`}>
      <h5 className="title">Add Friend</h5>
      <p className="description">
        You can add a friend with their username. It's cAsE sEnSiTiVe!
      </p>
      <div className="send-friend-request">
        <input type="text" id="add_friend_input" />
        <button
          onClick={HandleSubmit}
          className={disabled ? "disabled" : ""}
          disabled={disabled}
        >
          Send Friend Request
        </button>
      </div>
      <span className="message" ref={messageRef}></span>
    </div>
  );
};

const AddFriend = styled(AddFriendWrapper)`
  padding: 30px;
  .title {
    color: white;
    text-transform: uppercase;
  }
  .description {
    color: #d9d9d9;
    font-weight: 300;
    font-size: 14px;
  }

  .send-friend-request {
    display: flex;
    align-items: center;
    flex-shrink: 0;
    overflow: hidden;
    width: 900px;
    position: relative;

    button {
      white-space: pre;
      outline: none;
      background-color: #5865f2;
      color: white;
      border: none;
      padding: 6px 10px;
      border-radius: 5px;
      position: absolute;
      font-size: 14px;
      right: 0px;
      margin-right: 10px;

      &.disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
    }
  }

  input {
    width: 100%;
    padding: 14px;
    border-radius: 5px;
    outline: none;
    border: 1.5px solid #212326;
    background-color: #303238;
    color: white;
    padding-left: 20px;
    padding-right: 180px;

    &:focus {
      border: 1.5px solid skyblue;
    }
  }

  .message {
    font-size: 14px;
    margin: 5px;

    &.error {
      color: #ff9494;
    }

    &.success {
      color: rgb(59, 165, 93);
    }
  }
`;

export default AddFriend;
