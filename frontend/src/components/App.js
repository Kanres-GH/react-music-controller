import React, { Component } from "react";
import { createRoot } from "react-dom/client";
import HomePage from "./Homepage";


export default function App() {
    // constructor(props) {
    //     super(props);
    // }
        
    return (
        <div className="center">
            <HomePage />
        </div>
    );
}

const appDiv = document.getElementById("app");
const root = createRoot(appDiv);
root.render(<App />);