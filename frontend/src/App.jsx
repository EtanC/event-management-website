import { useEffect } from "react";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/HomePage";
import EventInfoPage from "./pages/EventInfoPage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage"
import EventLoading from "./components/EventLoading";

const App = () => {

  useEffect(() => {
    document.title = "Project41Pls";
  }, []);

  return (
    <Router basename="/">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/event" element={<EventInfoPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/eventCard" element={<EventLoading />} />
        <Route path="/event/:id" element={<EventInfoPage />} />
      </Routes>
    </Router>
  );
};

export default App;