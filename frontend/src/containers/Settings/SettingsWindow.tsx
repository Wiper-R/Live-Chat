import {
  FC,
  FormEvent,
  forwardRef,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import { MdEdit } from "react-icons/md";
import { useDispatch, useSelector } from "react-redux";
import request, { ApiError } from "../../request";
import { RootState } from "../../store";
import { AuthState, UserLoaded } from "../../store/reducers/AuthReducer";

interface SettingsInputProps {
  title: string;
  value?: string;
}

const SettingsInput = forwardRef<HTMLInputElement, SettingsInputProps>(
  (props, ref) => {
    const [disabled, setDisabled] = useState<boolean>(true);
    const myref = ref as RefObject<HTMLInputElement>;
    useEffect(() => {
      setDisabled(true);
      if (myref.current && props.value) {
        myref.current.value = props.value;
      }
      myref.current?.addEventListener("blur", () => {
        if (myref.current?.value === props.value) {
          setDisabled(true);
        }
      });
    }, [props.value]);

    useEffect(() => {
      if (!disabled) {
        myref.current?.focus();
      }
    }, [disabled]);

    return (
      <div className="flex flex-col mb-2 relative">
        <span className="text-white select-none capitalize p-1">
          {props.title}
        </span>
        <input
          type="text"
          className={
            "p-2 px-3 bg-ui-dark rounded-md outline-blue-400 text-white " +
            (disabled ? "pointer-events-none opacity-70 pr-8" : "")
          }
          disabled={disabled}
          ref={myref}
        />
        <button
          className={
            "absolute right-2 top-11 text-gray-400 " +
            (!disabled ? "hidden" : "")
          }
          onClick={() => {
            setDisabled(false);
          }}
          type="button"
          disabled={!disabled}
        >
          <MdEdit />
        </button>
      </div>
    );
  }
);

const SettingsWindow: FC = () => {
  const dispatch = useDispatch();
  const usernameRef = useRef<HTMLInputElement>(null);
  const firstnameRef = useRef<HTMLInputElement>(null);
  const lastnameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);

  const { user } = useSelector<RootState, AuthState>((state) => state.auth);
  const [saved, setSaved] = useState<[RefObject<HTMLInputElement>, string?][]>(
    []
  );
  const [changed, setChanged] = useState<boolean>(false);

  useEffect(() => {
    setSaved([
      [usernameRef, user?.username],
      [firstnameRef, user?.firstname],
      [lastnameRef, user?.lastname],
      [emailRef, user?.email],
    ]);
    setChanged(false);
    console.log(saved);
  }, [user]);

  const handleFormChange = (e: FormEvent<HTMLFormElement>) => {
    for (const [ref, value] of saved) {
      if (ref.current?.value !== value) {
        return setChanged(true);
      }
    }
    setChanged(false);
  };

  const handleFormSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    request("users/@me", {
      method: "PUT",
      json: {
        username: usernameRef.current?.value ?? user?.username,
        firstname: firstnameRef.current?.value ?? user?.firstname,
        lastname: lastnameRef.current?.value ?? user?.lastname,
        email: emailRef.current?.value ?? user?.email,
      },
    }).then(
      (data) => {
        dispatch(UserLoaded(data));
      },
      (e: ApiError) => {
        console.log(e);
      }
    );
  };

  return (
    <div className="flex justify-center items-center w-full">
      <form
        action=""
        className="flex flex-col w-96 bg-ui p-10 rounded-md"
        onChange={handleFormChange}
        onSubmit={handleFormSubmit}
      >
        <SettingsInput
          title="Username"
          value={user?.username}
          ref={usernameRef}
        />
        <SettingsInput
          title="Firstname"
          value={user?.firstname}
          ref={firstnameRef}
        />
        <SettingsInput
          title="Lastname"
          value={user?.lastname}
          ref={lastnameRef}
        />
        <SettingsInput title="Email" value={user?.email} ref={emailRef} />
        <button
          className={
            "py-2 font-semibold uppercase mt-2 bg-blue-400 rounded-md " +
            (!changed ? "opacity-60 cursor-not-allowed" : "")
          }
          disabled={!changed}
        >
          Save
        </button>
      </form>
    </div>
  );
};

export default SettingsWindow;
