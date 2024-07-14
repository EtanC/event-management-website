import axios from 'axios';

const fetchRegisteredEvents = async (setEvents, setError, setIsLoading) => {
    setIsLoading(true);
    try {
        const response = await axios.get('http://127.0.0.1:5000/user/events', { withCredentials: true });
        setEvents(response.data.events);
        setError(null);
    } catch (err) {
        setError('Failed to fetch events');
    } finally {
        setIsLoading(false);
    }
};

export default fetchRegisteredEvents;
