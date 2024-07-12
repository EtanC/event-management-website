import axios from 'axios';

const handleRegisterEvent = async (eventId) => {

    try {
        await axios.post(`http://127.0.0.1:5000/user/register/${eventId}`, {}, { withCredentials: true });
        alert("ynice") // need to make it nicer
    } catch (error) {
        console.error('Failed to register for the event:', error);
        alert('Failed to register for the event.');
    }
};

export default handleRegisterEvent;
