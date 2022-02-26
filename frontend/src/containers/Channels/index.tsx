import { FC } from "react";
import { Routes, Route } from "react-router";
import Friends from "./Friends";
import Chat from "./Chat";

const Channels: FC = () => {
  return (
    <Routes>
        <Route path="/@me" element={<Friends />} />
        <Route path="/:id" element={<Chat />} />
    </Routes>
  );
};

export default Channels;
