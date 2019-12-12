import React, { useState, useEffect } from "react";
import Video from "twilio-video";
import { Participant } from "components";

const Room = ({ roomName, token, handleLogout }) => {
  const [room, setRoom] = useState(null);
  const [participants, setParticipants] = useState([]);

  useEffect(() => {
    const participantConnected = participant => {
      setParticipants(prevParticipants => [...prevParticipants, participant]);
    };

    const participantDisconnected = particpant => {
      setParticipants(prevParticipants => {
        return prevParticipants.filter(p => p !== particpant);
      });
    };

    console.log({ Video });

    Video.connect(token, {
      name: roomName,
      audio: false,
      video: true
    }).then(
      room => {
        console.log({ room });
        setRoom(room);
        room.on("participantConnected", participantConnected);
        room.on("participantDisconnected", participantDisconnected);
        room.participants.forEach(participantConnected);
      },
      error => {
        console.log("Could not connect to Twilio: " + error.message);
      }
    );

    return () => {
      setRoom(currentRoom => {
        if (currentRoom && currentRoom.localParticipant.state === "connected") {
          currentRoom.disconnect();
          return null;
        } else {
          return currentRoom;
        }
      });
    };
  }, [token, roomName]);

  console.log({ room, participants });

  const remoteParticipants = participants.map(participant => (
    <Participant key={participant.sid} participant={participant} />
  ));

  return (
    <div className="room">
      <h2>Room: {roomName}</h2>
      <button onClick={handleLogout}>Log out</button>
      <div className="local-particpant">
        {room && (
          <Participant
            key={room.localParticipant.sid}
            participant={room.localParticipant}
          />
        )}
      </div>
      <h3>Remote participants</h3>
      <div className="remote-particpants">{remoteParticipants}</div>
    </div>
  );
};

export default Room;
