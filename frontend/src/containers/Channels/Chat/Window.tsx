import { FC } from "react";

interface MessageProps {
  content: string;
  is_sender?: boolean;
}

const Message: FC<MessageProps> = (props) => {
  return (
    <div
      className={
        "py-1.5 px-3 pr-14 m-1 w-fit flex relative rounded-md max-w-lg " +
        (props.is_sender ? "ml-auto bg-blue-300" : "bg-gray-100")
      }
      data-sender={!!props.is_sender}
    >
      <div>{props.content}</div>
      <div className="absolute right-2 bottom-0 text-xs">22:00</div>
    </div>
  );
};

interface MessageGroupProps {
  messages: MessageProps[];
  is_sender?: boolean;
}

const MessageGroup: FC<MessageGroupProps> = (props) => {
  return (
    <div
      className={"message__group w-fit " + (props.is_sender ? "ml-auto" : "")}
    >
      {props.messages.map((msg) => (
        <Message content={msg.content} is_sender={props.is_sender} />
      ))}
    </div>
  );
};

const Window: FC = () => {
  return (
    <div className="chat__window flex-grow h-0 scrollbar flex flex-col-reverse overflow-x-hidden overflow-y-scroll px-10 py-2">
      <MessageGroup
        messages={[
          {
            content:
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi libero, perspiciatis labore ipsa, explicabo architecto exercitationem, ratione nesciunt cumque officia obcaecati ex mollitia voluptate iure voluptates quibusdam fugit eveniet autem ab voluptatem vero molestias. Nihil sunt sint ipsa optio accusamus magni. Velit ipsum suscipit eius laborum? Deserunt, inventore esse! Adipisci!",
          },
          { content: "This is a message" },
          { content: "This is a message" },
          { content: "This is a message" },
          { content: "This is a message" },
          { content: "This is a message" },
          { content: "This is a message" },
        ]}
        is_sender={false}
      />
      <MessageGroup
        messages={[
          {
            content:
              "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nisi libero, perspiciatis labore ipsa, explicabo architecto exercitationem, ratione nesciunt cumque officia obcaecati ex mollitia voluptate iure voluptates quibusdam fugit eveniet autem ab voluptatem vero molestias. Nihil sunt sint ipsa optio accusamus magni. Velit ipsum suscipit eius laborum? Deserunt, inventore esse! Adipisci!",
          },
          { content: "This is a message" },
          { content: "This is a message" },
          { content: "This is a message" },
          { content: "This is a message" },
          { content: "This is a message" },
          { content: "This is a message" },
        ]}
        is_sender={true}
      />
    </div>
  );
};

export default Window;
