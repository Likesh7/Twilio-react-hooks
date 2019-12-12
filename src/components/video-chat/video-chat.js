import React, { useState, useCallback } from "react";
import { Lobby, Room } from "components";
import axios from "axios";

const VideoChat = () => {
  const [username, setUsername] = useState("");
  const [roomName, setRoomName] = useState("");
  const [token, setToken] = useState(null);

  const handleUserNameChange = useCallback(event => {
    setUsername(event.target.value);
  }, []);

  const handleRoomNameChange = useCallback(event => {
    setRoomName(event.target.value);
  }, []);

  const handleSubmit = useCallback(
    async event => {
      event.preventDefault();

      axios.defaults.headers.post["Content-Type"] =
        "application/json;charset=utf-8";
      axios.defaults.headers.post["Access-Control-Allow-Origin"] = "*";

      const body = JSON.stringify({ identity: username, room: roomName });
      const data = await axios.post("/video/token", body);

      console.log({ data });

      setToken(data.data.token);
    },
    [username, roomName]
  );

  const handleLogout = useCallback(event => {
    setToken(null);
  }, []);

  return (
    <div>
      {token ? (
        <Room roomName={roomName} token={token} handleLogout={handleLogout} />
      ) : (
        <Lobby
          username={username}
          roomName={roomName}
          handleUserNameChange={handleUserNameChange}
          handleRoomNameChange={handleRoomNameChange}
          handleSubmit={handleSubmit}
        />
      )}
    </div>
  );
};

export default VideoChat;
