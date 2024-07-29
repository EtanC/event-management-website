import { useEffect, useState } from "react";
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import "./index.css";
import { ProfileProvider, useProfile } from "../src/components/ProfileProvider";
import NavBar from "./components/Navbar";

import HomePage from "./pages/HomePage";
import EventDetailPage from "./pages/EventDetailPage";
import ProfilePage from "./pages/ProfilePage";
import RegisterPage from "./pages/RegisterPage";
import LoginPage from "./pages/LoginPage"
import AdminPage from "./pages/AdminPage"
import AdminUsersPage from "./pages/AdminUsersPage"
import AdminEventsPage from "./pages/AdminEventsPage"
import MyEventsPage from "./pages/MyEventsPage";
import SessionTimeOutPopup from './components/SessionTimeOutPopup';
import ProtectedRoute from './components/ProtectedRoute';

const AppContent = () => {
    const location = useLocation();
    const showNavBar = !['/login', '/register'].includes(location.pathname);
    const { isAuthenticated } = useProfile();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        if (!isAuthenticated) {
            setIsPopupOpen(true);
        }
    }, [isAuthenticated]);

    const handleClosePopup = () => {
        setIsPopupOpen(false);
    };

    return (
        <>
        {showNavBar && <NavBar />}
        <div className="content">
            <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/event" element={<EventDetailPage />} />
                <Route path="/profile" element={<ProtectedRoute element={<ProfilePage />} />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/event/:id" element={<EventDetailPage />} />
                <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} />} />
                <Route path="/admin/users" element={<ProtectedRoute element={<AdminUsersPage />} />} />
                <Route path="/admin/events" element={<ProtectedRoute element={<AdminEventsPage />} />} />
                <Route path="/my-events" element={<ProtectedRoute element={<MyEventsPage />} />} />
            </Routes>
            <SessionTimeOutPopup open={isPopupOpen} handleClose={handleClosePopup} />
        </div>
        </>
    );
};

const App = () => {
    useEffect(() => {
        document.title = "EventHubb";
    }, []);

    return (
        <Router basename="/">
            <ProfileProvider>
                <AppContent />
            </ProfileProvider>
        </Router>
    );
};

export default App;
