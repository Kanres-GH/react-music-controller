import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';

const Room = () => {
    const { roomCode } = useParams();
    const [roomDetails, setRoomDetails] = useState({
        votesToSkip: 2,
        guestCanPause: false,
        isHost: false,
    });

    useEffect(() => {
        const getRoomDetails = async () => {
          try {
            const response = await fetch(`/api/get-room?code=${roomCode}`);
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            const data = await response.json();
            setRoomDetails({
              votesToSkip: data.votes_to_skip,
              guestCanPause: data.guest_can_pause,
              isHost: data.is_host,
            });
          } catch (error) {
            console.error("Error fetching room details:", error);
            // Handle error state here
          }
        };
    
        getRoomDetails();
      }, [roomCode]);

    return (
        <div>
            <h3>{roomCode}</h3>
            <p>Votes: {roomDetails.votesToSkip}</p>
            <p>Guest Can Pause: {roomDetails.guestCanPause.toString()}</p>
            <p>Host: {roomDetails.isHost.toString()}</p>
        </div>
    );
}

export default Room;