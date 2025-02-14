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
import MyEventsPage from "./pages/MyEventsPage";
import ForgotPasswordPage from "./pages/ForgotPasswordPage";
import ResetPasswordPage from "./pages/ResetPasswordPage";
import SessionTimeOutPopup from './components/popups/SessionTimeOutPopup';
import ProtectedRoute from './components/ProtectedRoute';

const AppContent = () => {
    const location = useLocation();
    const showNavBar = !['/login', '/register', '/forgot-password', '/reset-password'].includes(location.pathname);
    const { sessionExpired, setSessionExpired, loggedOut } = useProfile();
    const [isPopupOpen, setIsPopupOpen] = useState(false);

    useEffect(() => {
        if (sessionExpired && !loggedOut) {
            setIsPopupOpen(true);
            setSessionExpired(false); // Ensure it only pops up once after session expires
        }
    }, [loggedOut, sessionExpired, setSessionExpired]);

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
                    <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                    <Route path="/reset-password" element={<ResetPasswordPage />} />
                    <Route path="/event/:id" element={<EventDetailPage />} />
                    <Route path="/admin" element={<ProtectedRoute element={<AdminPage />} requireAdmin={true}/>} />
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
