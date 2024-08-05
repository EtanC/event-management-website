import axios from 'axios';
import config from '../config'

const handleRegisterEvent = async (eventId) => {
    try {
        await axios.post(`${config.apiBaseUrl}/user/register/${eventId}`, {}, { withCredentials: true });
        return { success: true, message: 'Successfully registered for the event.' };
    } catch (error) {
        return { success: false, message: 'Failed to register for the event.' };
    }
};

export default handleRegisterEvent;
