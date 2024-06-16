import React, { useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import EventInfoPage from "./pages/EventInfoPage";

const App = () => {

  useEffect(() => {
    document.title = "Project41Pls";
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<EventInfoPage />} />
      </Routes>
    </Router>
  );
};

export default App;