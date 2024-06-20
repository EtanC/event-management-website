import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/HomePage";
import EventInfoPage from "./pages/EventInfoPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => {

  useEffect(() => {
    document.title = "Project41Pls";
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event" element={<EventInfoPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Routes>
    </Router>
  );
};

export default App;