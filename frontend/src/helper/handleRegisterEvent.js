import axios from 'axios';

const handleRegisterEvent = async (eventId) => {
    try {
        await axios.post(`http://127.0.0.1:5000/user/register/${eventId}`, {}, { withCredentials: true });
        return { success: true, message: 'Successfully registered for the event.' };
    } catch (error) {
        return { success: false, message: 'Failed to register for the event.' };
    }
};

export default handleRegisterEvent;
