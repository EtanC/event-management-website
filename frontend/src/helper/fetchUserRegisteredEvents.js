import axios from 'axios';

const fetchUserEvents = async (setEvents, setError, setIsLoading) => {
    setIsLoading(true);
    try {
        const response = await axios.get('http://127.0.0.1:5000/user/events');
        setEvents(response.data);
        setError(null);
    } catch (err) {
        setError('Failed to fetch events');
    } finally {
        setIsLoading(false);
    }
};

export default fetchUserEvents;
