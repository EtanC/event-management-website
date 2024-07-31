import axios from 'axios';
import config from '../config';

export const fetchAllUsers = async () => {
    try {
        const response = await axios.get(`${config.apiBaseUrl}/user/get/all`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};


export const toggleAdminStatus = async (action, username) => {
    try {
        // Determine the URL based on the action
        const url = action === 'invite'
            ? `${config.apiBaseUrl}/admin/invite_admin`
            : `${config.apiBaseUrl}/admin/remove_admin`;
        const response = await axios.post(url, { username }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Error ${action === 'invite' ? 'inviting' : 'removing'} admin:`, error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete(`${config.apiBaseUrl}/user/delete`, {
            data: { user_id: userId },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
