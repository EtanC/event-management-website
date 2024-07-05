import axios from 'axios';

const fetchRegisteredEvents = async (setEvents, setError, setIsLoading) => {
    setIsLoading(true);
    try {
        const token = localStorage.getItem('token'); // change this later on
        const response = await axios.get('http://127.0.0.1:5000/user/events', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        setEvents(response.data.events);
        setError(null);
    } catch (err) {
        setError('Failed to fetch events');
    } finally {
        setIsLoading(false);
    }
};

export default fetchRegisteredEvents;
