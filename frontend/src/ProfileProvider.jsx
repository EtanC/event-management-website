import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { fetchProfileData } from './helper/handleProfileData';

const ProfileContext = createContext();

export const useProfile = () => {
    return useContext(ProfileContext);
};

export const ProfileProvider = ({ children }) => {
    const [profileData, setProfileData] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (localStorage.getItem('token')) {
            fetchProfileData(setProfileData);
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
