import axios from 'axios';

const sleep = (ms) => new Promise(resolve => setTimeout(resolve, ms));

export const fetchEventsData = async (setEvents, setLocations, setError, setIsLoading) => {
    setIsLoading(true);
    try {
        await sleep(2000);
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

export const createEvent = async (eventData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post('http://127.0.0.1:5000/event/create',
            { event: eventData },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        console.log('line 41:', response);
        return response.status;
    } catch (error) {
        console.log(`Event creation failed ${error.message}`);
        throw (error);
    }
};


