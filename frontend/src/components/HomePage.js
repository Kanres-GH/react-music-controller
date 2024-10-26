import React, { Component } from "react";
import CreateRoomPage from "./CreateRoomPage";
import RoomJoinPage from "./RoomJoinPage";
import Room from "./Room";
import { useParams, useLocation, matchPath } from "react-router-dom";
import { BrowserRouter as Router, Routes, Route, Link} from "react-router-dom";

export default function HomePage() {
    return (
      <Router>
        <Routes>
          <Route exact path="/" element={<p>This is the home page</p>} />
          <Route path="/join" element={<RoomJoinPage />} />
          <Route path="/create" element={<CreateRoomPage />} />
          <Route path="/room/:roomCode" element={<Room />} />
        </Routes>
      </Router>
    );
  }