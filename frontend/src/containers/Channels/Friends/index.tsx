import { FC, useEffect, useState } from "react";
import AddFriend from "./AddFriend";
import FriendsView from "./FriendsView";
import Header from "./Header";

const Friends: FC = () => {
  const [page, changePage] = useState("ALL");
  useEffect(() => {}, [page]);

  const friendsView = () => {
    return ["ONLINE", "ALL", "PENDING"].indexOf(page) !== -1;
  };

  return (
    <div className="flex flex-col p-6 flex-grow">
      <Header page={page} changePage={changePage} />
      {friendsView() ? <FriendsView page={page} /> : <AddFriend />}
    </div>
  );
};

export default Friends;
