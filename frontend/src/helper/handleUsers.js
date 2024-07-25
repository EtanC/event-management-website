import axios from 'axios';

export const fetchAllUsers = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/user/get/all', { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Error fetching all users:', error);
        throw error;
    }
};

// Function to toggle admin status
export const toggleAdminStatus = async (action, username) => {
    try {
        // Determine the URL based on the action
        const url = action === 'invite'
            ? 'http://127.0.0.1:5000/admin/invite_admin'
            : 'http://127.0.0.1:5000/admin/remove_admin';

        // Make the POST request to the appropriate endpoint
        const response = await axios.post(url, { username }, { withCredentials: true });

        // Return the response data if needed
        return response.data;
    } catch (error) {
        console.error(`Error ${action === 'invite' ? 'inviting' : 'removing'} admin:`, error);
        throw error;
    }
};
