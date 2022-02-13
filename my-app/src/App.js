import * as React from "react";
import { Routes, Route, Link } from "react-router-dom";
import "./App.css";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Exibitions from "./components/exibitions";
import Exhibtion from "./components/exhibtion";
function App() {
    return (
        <div className="App">
            <Box sx={{ flexGrow: 1 }}>
                <AppBar position="static">
                   <h3>Exhibitions</h3>
                </AppBar>
            </Box>
            <Routes>
                <Route path="/" element={<Exibitions />} />
                <Route path="/exhibition/:id" element={<Exhibtion />} />
            </Routes>
        </div>
    );
}

export default App;
