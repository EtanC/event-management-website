import axios from 'axios';

const fetchEventData = async (setEvents, setLocations, setError, setIsLoading) => {
    setIsLoading(true);
    try {
        const response = await axios.get('http://127.0.0.1:5000/events/get/all');
        const eventData = response.data;

        // Set initial events and locations
        setEvents(eventData);
        const uniqueLocations = [...new Set(eventData.map(event => event.location))];
        setLocations(uniqueLocations);
    } catch (err) {
        setError('Failed to fetch events');
    } finally {
        setIsLoading(false);
    }
};

export default fetchEventData;
