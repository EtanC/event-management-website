import axios from 'axios';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

const fetchEventsData = async (setEvents, setLocations, setError, setIsLoading) => {
    setIsLoading(true);
    try {
        await sleep(2000);
        const response = await axios.get('http://127.0.0.1:5000/events/get/all');
        const eventData = response.data.events;
        setEvents(eventData);
        const uniqueLocations = [...new Set(eventData.map(event => event.location).filter(loc => loc))];
        setLocations(uniqueLocations);
        setError(null);
    } catch (err) {
        setError('Failed to fetch events' + err);
    } finally {
        setIsLoading(false);
    }
};

export default fetchEventsData;