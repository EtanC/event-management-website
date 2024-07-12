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

export const handleCreateEvent = async (eventData) => {
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

export const fetchUserEvents = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/events/get/all');
        const eventData = response.data;
        const token = localStorage.getItem('token');

        if (token) {
            const decodedToken = jwtDecode(token);
            const user_id = decodedToken.user_id;
            const createdEvents = eventData.events.filter(event => event.creator === user_id);
            const managedEvents = eventData.events.filter(event =>
                event.creator !== user_id &&
                event.authorized_users &&
                event.authorized_users.includes(user_id)
            );

            return {
                createdEvents,
                managedEvents
            };
        }

        return {
            createdEvents: [],
            managedEvents: []
        };
    } catch (error) {
        console.error('Error fetching user events: ', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const fetchUserRegisteredEvents = async () => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://127.0.0.1:5000/user/events', {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        if (response) return response.data.events
    } catch (error) {
        console.error('Error fetching user registered events: ', error.response ? error.response.data : error.message);
        throw (error);
    }
}

export const handleEditEvent = async (event_id, eventData) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.put(`http://127.0.0.1:5000/event/update/${event_id}`,
            { event: eventData },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'application/json'
                }
            });
        return response.status;
    } catch (error) {
        console.error('Error editing event: ', error.response ? error.response.data : error.message);
        throw (error);
    }
}


export const handleDeleteEvent = async (event_id) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.delete(`http://127.0.0.1:5000/event/delete/${event_id}`, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'application/json'
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting event: ', error.response ? error.response.data : error.message);
        throw (error);
    }
}

export const handleAddEventManager = async (eventId, email) => {
    try {
        const token = localStorage.getItem('token');
        const response = await axios.post(`http://127.0.0.1:5000/event/authorize`,
            { event_id: eventId, user_email: email },
            {
                headers: {
                    'Authorization': `Bearer ${token}`,
                }
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding an event manager: ', error.response ? error.response.data : error.message);
        throw error;
    }
};
