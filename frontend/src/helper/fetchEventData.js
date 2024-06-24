import axios from 'axios';

const fetchEventsData = async (setEvents, setLocations, setError, setIsLoading) => {
    setIsLoading(true);
    try {
        const response = await axios.get('http://127.0.0.1:5000/events/get/all');
        const eventData = response.data;
        setEvents(eventData);
        const uniqueLocations = [...new Set(eventData.map(event => event.location).filter(loc => loc))];
        setLocations(uniqueLocations);
        setError(null);
    } catch (err) {
        setError('Failed to fetch events');
    } finally {
        setIsLoading(false);
    }
};

export default fetchEventsData;
