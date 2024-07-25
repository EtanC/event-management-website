import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import useLocalStorageTokenExpires from '../hooks/useLocalStorageTokenExpires'

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tokenExpires, setTokenExpires] = useLocalStorageTokenExpires('tokenExpires', new Date());
    const [isAuthenticated, setIsAuthenticated] = useState(tokenExpires ? new Date().getTime() < tokenExpires.getTime() : false);

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
        console.log("here")
    };

    useEffect(() => {
        const checkAuth = () => {
            const tokenNotExpired = new Date().getTime() < tokenExpires.getTime()
            if (tokenNotExpired !== isAuthenticated) setIsAuthenticated(tokenNotExpired);
        };

        if (isAuthenticated) {
            fetchProfileData();
        } else {
            setProfileData(null);
            setLoading(false);
        }

        const intervalId = setInterval(checkAuth, 1000); // Check every second

        return () => clearInterval(intervalId); // Cleanup interval on unmount
    }, [isAuthenticated, tokenExpires]);

    return (
        <ProfileContext.Provider value={{ profileData, loading, isAuthenticated, setProfileData, tokenExpires, setTokenExpires }}>
            {children}
        </ProfileContext.Provider>
    );
};
