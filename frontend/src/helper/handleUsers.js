import axios from 'axios';

export const fetchAllUsers = async () => {
    try {
        console.log('Fetching all users...');
        const response = await axios.get('http://127.0.0.1:5000/user/get/all', { withCredentials: true });
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
            ? 'http://127.0.0.1:5000/admin/invite_admin'
            : 'http://127.0.0.1:5000/admin/remove_admin';
        const response = await axios.post(url, { username }, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error(`Error ${action === 'invite' ? 'inviting' : 'removing'} admin:`, error);
        throw error;
    }
};

export const deleteUser = async (userId) => {
    try {
        const response = await axios.delete('http://127.0.0.1:5000/user/delete', {
            data: { user_id: userId },
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting user:', error);
        throw error;
    }
};
