import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';

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
                const token = localStorage.getItem('token');
                const response = await axios.get('http://127.0.0.1:5000/profile/get', {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                });
                setProfileData(response.data);
            } catch (err) {
                console.log(`Failed to fetch profile: ${err.message}`);
            } finally {
                setLoading(false);
            }
        };

        if (localStorage.getItem('token')) fetchProfileData();
        else setLoading(false);
    }, []);

    return (
        <ProfileContext.Provider value={{ profileData, setProfileData, loading }}>
            {children}
        </ProfileContext.Provider>
    );
};
