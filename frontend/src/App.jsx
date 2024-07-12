import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";

import HomePage from "./pages/HomePage";
import EventDetailPage from "./pages/EventDetailPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage"
import AdminPage from "./pages/AdminPage"
import AdminUsersPage from "./pages/AdminUsersPage"
import AdminEventsPage from "./pages/AdminEventsPage"
import UserCalendar from "./pages/UserCalendar";
import SessionTimeOutPopup from './components/SessionTimeOutPopup';
import useSessionValidation from "./helper/userSessionValidation";

const App = () => {
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
                <Route path="/MyCalendar" element={<UserCalendar />} />
            </Routes>
            <SessionTimeOutPopup open={isPopupOpen} handleClose={handleClosePopup} />
        </Router>
    );
};

export default App;