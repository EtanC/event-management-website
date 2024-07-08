import axios from 'axios';
import { jwtDecode } from 'jwt-decode';

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
        return response.status;
    } catch (error) {
        console.error(`Event creation failed ${error.message}`);
        throw (error);
    }
};

export const fetchUserCreatedEvents = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/events/get/all');
        const eventData = response.data;
        const token = localStorage.getItem('token');
        if (token) {
            const user_id = jwtDecode(token).user_id;
            return (eventData.events.filter(event => event.creator === user_id));
        }
    } catch (error) {
        console.error('Error fetching user created events: ', error.response ? error.response.data : error.message);
    }
}

export const fetchUserRegisteredEvents = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:5000/user/events', {
            headers: {
                Authorization: `Bearer ${token}`
            }
        });
        if (response) {
            return response.data.events
        }
    } catch (error) {
        console.error('Error fetching user registered events: ', error.response ? error.response.data : error.message);
    }
}

export const handleEditEvent = async () => {
    console.log('edit event')
}

export const handleDeleteEvent = async (event_id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://127.0.0.1:5000/event/delete/${event_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting event: ', error.response ? error.response.data : error.message);
    }
}
