import React from "react";
import "./index.scss";
import { Success } from "./components/Success";
import { Users } from "./components/Users";
import { Skeleton } from "./components/Users/Skeleton";

function App() {
  const [users, setUsers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);
  const [searchValue, setSearchValue] = React.useState("");
  const [friends, setFriends] = React.useState([]);
  const [send, setSend] = React.useState(false);

  React.useEffect(() => {
    fetch("https://reqres.in/api/users")
      .then((response) => response.json())
      .then((json) => {
        setUsers(json.data);
      })
      .catch((err) => {
        console.warn(err);
        alert("Ошибка при получении пользователей");
      })
      .finally(() => setLoading(false));
  }, []);

  function onAddFriend(id) {
    if (friends.includes(id)) {
      setFriends((prev) => prev.filter((_id) => _id !== id));
    } else {
      setFriends((prev) => [...prev, id]);
    }
  }

  function onChangeSearchValue(e) {
    setSearchValue(e.target.value);
  }

  function onClickSend() {
    setSend(!send);
  }

  console.log(searchValue);
  console.log(friends);

  return (
    <div className="App">
      {send ? (
        <Success />
      ) : (
        <Users
          items={users}
          isLoading={loading}
          searchValue={searchValue}
          onChangeSearchValue={onChangeSearchValue}
          friends={friends}
          onAddFriend={onAddFriend}
          onClickSend={onClickSend}
        />
      )}
    </div>
  );
}

export default App;
