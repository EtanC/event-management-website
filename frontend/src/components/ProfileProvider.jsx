import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isAuthenticated, setIsAuthenticated] = useState(!!Cookies.get('token'));

    const fetchProfileData = async () => {
        setLoading(true);
        try {
            const response = await axios.get('http://127.0.0.1:5000/profile/get', { withCredentials: true });
            setProfileData(response.data);
        } catch (err) {
            console.error(`Failed to fetch profile: ${err.message}`);
            setProfileData(null);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const checkAuth = () => {
            const tokenExists = !!Cookies.get('token');
            if (tokenExists !== isAuthenticated) {
                setIsAuthenticated(tokenExists);
            }
        };

        if (isAuthenticated) {
            fetchProfileData();
        } else {
            setProfileData(null);
            setLoading(false);
        }

        const intervalId = setInterval(checkAuth, 1000); // Check every second

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [isAuthenticated]);

    return (
        <ProfileContext.Provider value={{ profileData, loading, isAuthenticated, setProfileData }}>
            {children}
        </ProfileContext.Provider>
    );
};
