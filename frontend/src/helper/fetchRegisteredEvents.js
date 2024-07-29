import axios from 'axios';

export const fetchRegisteredEvents = async (setEvents, setError, setIsLoading) => {
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

export const fetchRegisteredEventsSimple = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/user/events', { withCredentials: true });
        return response.data.events; // Return the events directly
    } catch (err) {
        throw new Error('Failed to fetch events');
    }
};
