import axios from 'axios';
import config from '../config';

export const fetchProfileData = async (setProfile) => {
    try {
        const response = await axios.get(`${config.apiBaseUrl}/profile/get`, {
            withCredentials: true
        });
        const profileData = response.data;
        setProfile(profileData);
    } catch (err) {
        console.error(`Failed to fetch profile ${err.message}`);
    }
}

export const updateProfileDetails = async (updatedProfileData) => {
    const { description, job_title, fun_fact, full_name, email, profile_pic } = updatedProfileData;
    try {
        const formData = new FormData();
        formData.append('email', email);
        formData.append('description', description);
        formData.append('full_name', full_name);
        formData.append('job_title', job_title);
        formData.append('fun_fact', fun_fact);
        if (profile_pic) {
            formData.append('profile_pic', profile_pic);
        }

        const response = await axios.post(`${config.apiBaseUrl}/profile/update/details`, formData, {
            headers: {
                'Content-Type': 'multipart/form-data'
            },
            withCredentials: true
        });
        return response.status;
    } catch (error) {
        console.error('Failed to update profile:', error.response ? error.response.data.description : error.message);
    }
}

export const updateProfilePassword = async (password, setErrorMessage) => {
    const { old_pw, new_pw, confirm_new_pw } = password
    try {
        const response = await axios.post(`${config.apiBaseUrl}/profile/update/password`, {
            old_password: old_pw,
            new_password: new_pw,
            re_password: confirm_new_pw,
        }, {
            withCredentials: true
        });
        return response.status
    } catch (error) {
        console.error('Failed to change password:', error.response ? error.response.data.description : error.message)
        setErrorMessage(error.response ? error.response.data.description : error.message);
    }
}


export const updateProfilePreferences = async (newPreferences) => {
    try {
        const response = await axios.put(`${config.apiBaseUrl}/profile/update/preferences`, {
            new_preferences: newPreferences
        }, {
            withCredentials: true
        });
        return response.status;
    } catch (error) {
        console.error('Failed to update preferences:', error);
        throw error;
    }
};


export const toggleNotifications = async () => {
    try {
        const response = await axios.put(`${config.apiBaseUrl}/user/toggle_notifications`, {}, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error toggling notifications:', error);
        throw error;
    }
};
