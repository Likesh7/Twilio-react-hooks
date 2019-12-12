import React from "react";

const Lobby = ({
  username,
  handleUserNameChange,
  roomName,
  handleRoomNameChange,
  handleSubmit
}) => {
  return (
    <div className="lobby">
      <form onSubmit={handleSubmit}>
        <h2>Enter a room</h2>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="field"
            value={username}
            onChange={handleUserNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="room">Room name:</label>
          <input
            type="text"
            id="room"
            value={roomName}
            onChange={handleRoomNameChange}
            required
          />
        </div>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Lobby;
