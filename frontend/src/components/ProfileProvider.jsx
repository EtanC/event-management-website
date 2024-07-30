import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import useLocalStorageTokenExpires from '../hooks/useLocalStorageTokenExpires'
import config from '../config';

const ProfileContext = createContext();

export const useProfile = () => useContext(ProfileContext);

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [tokenExpires, setTokenExpires] = useLocalStorageTokenExpires('tokenExpires', new Date());
    const [isAuthenticated, setIsAuthenticated] = useState(tokenExpires ? new Date().getTime() < tokenExpires.getTime() : false);
    const [sessionExpired, setSessionExpired] = useState(false);

    const [loggedOut, setLoggedOut] = useState(false);

    const logout = () => {
        setIsAuthenticated(false);
        setLoggedOut(true);
    };

    useEffect(() => {
        if (isAuthenticated) {
            setLoggedOut(false); // Reset loggedOut state when user logs in
        }
    }, [isAuthenticated]);

    const fetchProfileData = async () => {
        setLoading(true);
        try {
            const response = await axios.get(`${config.apiBaseUrl}/profile/get`, { withCredentials: true });
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
            const now = new Date().getTime();
            const tokenNotExpired = now < tokenExpires.getTime();
            if (tokenNotExpired !== isAuthenticated) {
                setIsAuthenticated(tokenNotExpired);
            }
            if (!tokenNotExpired && !sessionExpired && isAuthenticated) {
                setSessionExpired(true);
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
    }, [isAuthenticated, sessionExpired, tokenExpires]);

    // this useeffect make sure it only happens once on timeout
    useEffect(() => {
        const now = new Date().getTime();
        const timeoutDuration = tokenExpires.getTime() - now;
        
        if (timeoutDuration > 0) {
            const timeoutId = setTimeout(() => {
                if (isAuthenticated) {
                    setSessionExpired(true);
                }
            }, timeoutDuration);
    
            return () => clearTimeout(timeoutId);
        }
    }, [isAuthenticated, tokenExpires]);

    return (
        <ProfileContext.Provider value={{ profileData, loading, isAuthenticated, setProfileData, tokenExpires, setTokenExpires, sessionExpired, setSessionExpired, loggedOut, setLoggedOut, logout }}>
            {children}
        </ProfileContext.Provider>
    );
};
