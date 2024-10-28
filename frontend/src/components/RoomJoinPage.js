import React, { useState } from "react";
import { TextField, Button, Grid2, Typography } from '@mui/material';
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";

export default function RoomJoinPage() {

    const navigate = useNavigate()

    const [roomCode, setRoomCode] = useState("");
    const [error, setError] = useState(false);

    // constructor(props) {
    //     super(props);
    //     state = {
    //         roomCode: "",
    //         error: null,
    //     };
    //     handleTextFieldChange = handleTextFieldChange.bind(;
    //     roomButtonPressed = roomButtonPressed.bind(;
    // }

    const handleTextFieldChange = (e) => {
        setRoomCode(e.target.value);
        setError(false);
    }

    const roomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                code: roomCode,
            }),
        };
        fetch('/api/join-room', requestOptions)
        .then((response) => {
            if(response.ok) {
                navigate(`/room/${roomCode}`);
            } else {
                setError(true);
            }
        }).catch((error) => {
            console.error(error);
        });
    }

    return (
        <Grid2 container spacing={1} alignItems="center" direction={"column"}>
            <Grid2 xs={12}>
                <Typography variant="h4" component="h4">
                    Join a Room
                </Typography>
            </Grid2>
            <Grid2 xs={12}>
                <TextField
                    error={error}
                    label="code"
                    placeholder="Enter a Room Code"
                    value={roomCode}
                    helperText={error ? "Room not found." : ""}
                    variant="outlined"
                    onChange={handleTextFieldChange}
                    type="text"
                    // defaultValue={null}
                />
            </Grid2>
            <Grid2 xs={12}>
                <Button variant="contained" color="primary" onClick={roomButtonPressed}>Enter Room</Button>
            </Grid2>
            <Grid2 xs={12}>
                <Button variant="contained" color="secondary" to="/" component={Link}>Back</Button>
            </Grid2>
        </Grid2>
    );
}