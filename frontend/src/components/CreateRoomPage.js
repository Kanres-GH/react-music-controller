import React, { useState } from "react";
import { Grid2, Typography, Button, TextField, FormControl, FormHelperText, Radio, RadioGroup, FormControlLabel, Box } from "@mui/material";
import { Link } from "react-router-dom";
import {useNavigate} from "react-router-dom";


export default function CreateRoomPage() {

    const navigate = useNavigate();

    const defaultVotes = 2;
    const [guestCanPause, setGuestCanPause] = useState(true);
    const [votesToSkip, setVotesToSkip] = useState(defaultVotes);
    

    const handleVotesChange = (e) => {
        setVotesToSkip(e.target.value);
    };
    
      const handleGuestCanPauseChange = (e) => {
        setGuestCanPause(e.target.value);
    };
    
    const handleRoomButtonPressed = () => {
        const requestOptions = {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                votes_to_skip: votesToSkip,
                guest_can_pause: guestCanPause,
            }),
        };
        fetch('/api/create-room', requestOptions)
        .then((response) => response.json())
        .then((data) => navigate('/room/' + data.code));
    };

    return (

    <Grid2 container direction={"column"} spacing={1} justifyContent={"center"} alignItems={"center"} sx={{width: 1}}>
        <Grid2 size={{xs: 12}} align="center">
            <Typography component="h4" variant="h4">
                Create A Room
            </Typography>
        </Grid2>
        <Grid2 size={{xs: 12}} align="center">
            <FormControl component="fieldset">
                <FormHelperText component={"span"}>
                    <div align="center">Guest Control of Playback State</div>
                </FormHelperText>
                <RadioGroup row defaultValue="true" onChange={handleGuestCanPauseChange}>
                    <FormControlLabel value="true" control={<Radio color="primary" />} label="Play/Pause" labelPlacement="bottom" />

                    <FormControlLabel value="false" control={<Radio color="secondary" />} label="No Control" labelPlacement="bottom" />
                </RadioGroup>
            </FormControl>
        </Grid2>
        
            
        <Grid2 size={{xs: 12}} align="center">
            <FormControl>
                <TextField required={true} type="number" onChange={handleVotesChange} defaultValue={defaultVotes} slotProps={{
                    htmlInput: {
                        min: 1,
                        sx: {
                            textAlign: "center"
                        }
                    }
                }} />
                <FormHelperText component={"span"}>
                    <div align="center">Votes Required To Skip Song</div>
                </FormHelperText>
            </FormControl>
        </Grid2>
        <Grid2 size={{xs: 12}} align="center">
            <Button color="primary" variant="contained" onClick={handleRoomButtonPressed}>
                Create A Room
            </Button>
        </Grid2>
        <Grid2 size={{xs: 12}} align="center">
            <Button color="secondary" variant="contained" to="/" component={Link}>
                Back
            </Button>
        </Grid2>
    </Grid2>
    );
}