import React, { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import "./index.css";
import { ProfileProvider } from "./ProfileProvider";
import NavBar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import EventDetailPage from "./pages/EventDetailPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage"
import MyEventsPage from "./pages/MyEventsPage";
import AdminPage from "./pages/AdminPage"
import AdminUsersPage from "./pages/AdminUsersPage"
import AdminEventsPage from "./pages/AdminEventsPage"
import UserCalendar from "./pages/UserCalendar";

const AppContent = () => {
  const location = useLocation();
  const showNavBar = !['/login', '/register'].includes(location.pathname);

  return (
    <>
      {showNavBar && <NavBar />}
      <div className="content">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/event" element={<EventDetailPage />} />
          <Route path="/profile" element={<ProfilePage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/event/:id" element={<EventDetailPage />} />
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/admin/users" element={<AdminUsersPage />} />
          <Route path="/admin/events" element={<AdminEventsPage />} />
          <Route path="/my-events" element={<MyEventsPage />} />
          <Route path="/my-calendar" element={<UserCalendar />} />
        </Routes>
      </div>
    </>
  );
};

const App = () => {
  useEffect(() => {
    document.title = "Project41Pls";
  }, []);

  return (
    <Router basename="/">
      <ProfileProvider>
        <AppContent />
      </ProfileProvider>
    </Router >
  );
};

export default App;
