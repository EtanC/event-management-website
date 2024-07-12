import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import "./index.css";
import { ProfileProvider } from "../src/components/ProfileProvider";
import NavBar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import EventDetailPage from "./pages/EventDetailPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage";
import AdminPage from "./pages/AdminPage";
import AdminUsersPage from "./pages/AdminUsersPage";
import AdminEventsPage from "./pages/AdminEventsPage";
import UserCalendar from "./pages/UserCalendar";
import SessionTimeOutPopup from './components/SessionTimeOutPopup';
import useSessionValidation from "./helper/userSessionValidation";

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
            <Route path="/my-calendar" element={<UserCalendar />} />
            </Routes>
        </div>
        </>
    );
};

const App = () => {
    useEffect(() => {
        document.title = "EventHubb";
    }, []);

    const isSessionValid = useSessionValidation();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        if (!isSessionValid) {
            setIsPopupOpen(true);
        }
    }, [isSessionValid]);

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <Router basename="/">
            <ProfileProvider>
                <AppContent />
            </ProfileProvider>
            <SessionTimeOutPopup open={isPopupOpen} handleClose={handleClosePopup} />
        </Router>
    );
};

export default App;
