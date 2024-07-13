import { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

const ProfileContext = createContext();

export const useProfile = () => {
    return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProfileData = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:5000/profile/get', {
                    withCredentials: true
                });
                setProfileData(response.data);
            } catch (err) {
                console.log(`Failed to fetch profile: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        const token = Cookies.get('token');
        if (token) {
            fetchProfileData();
        } else {
            setLoading(false);
        }
    }, []);

    return (
        <ProfileContext.Provider value={{ profileData, setProfileData, loading }}>
            {children}
        </ProfileContext.Provider>
    );
};
