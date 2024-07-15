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

export const handleCreateEvent = async (eventData) => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/event/create',
            {
                'deadline': eventData.deadline,
                'details': eventData.details,
                'details_link': eventData.details_link,
                'name': eventData.name,
                'location': eventData.location,
                'start_date': eventData.start_date
            },
            {
                withCredentials: true,
            });
        return response.status;
    } catch (error) {
        console.error(`Event creation failed ${error.message}`);
        throw (error);
    }
};

export const fetchUserEvents = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/user/manage/events',
            {
                withCredentials: true
            }
        )
        if (response.status == 200) {
            return {
                createdEvents: response.data['creator'],
                managedEvents: response.data['manager'],
            }
        }
    } catch (error) {
        if (error.status == 403) {
            return {
                createdEvents: [],
                managedEvents: []
            }
        }
        console.error('Error fetching user events: ', error.response ? error.response.data : error.message);
        throw error;
    }
}

export const fetchUserRegisteredEvents = async () => {
    try {
        const response = await axios.get('http://127.0.0.1:5000/user/events', {
            withCredentials: true
        });
        if (response) return response.data.events
    } catch (error) {
        console.error('Error fetching user registered events: ', error.response ? error.response.data : error.message);
        throw (error);
    }
}

export const handleUnregister = async (event_id) => {
    try {
        const response = await axios.post(`http://127.0.0.1:5000/user/unregister/${event_id}`, {}, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error unregistering from event: ', error.response ? error.response.data : error.message);
        throw error;
    }
};

export const handleEditEvent = async (event_id, eventData) => {
    try {
        const response = await axios.put(`http://127.0.0.1:5000/event/update/${event_id}`,
            {
                'deadline': eventData.deadline,
                'details': eventData.details,
                'details_link': eventData.details_link,
                'name': eventData.name,
                'location': eventData.location,
                'start_date': eventData.start_date
            },
            {
                withCredentials: true
            });
        return response.status;
    } catch (error) {
        console.error('Error editing event: ', error.response ? error.response.data : error.message);
        throw (error);
    }
}


export const handleDeleteEvent = async (event_id) => {
    try {
        const response = await axios.delete(`http://127.0.0.1:5000/event/delete/${event_id}`, {
            withCredentials: true,
        });
        return response.data;
    } catch (error) {
        console.error('Error deleting event: ', error.response ? error.response.data : error.message);
        throw (error);
    }
}

export const handleAddEventManager = async (eventId, email) => {
    try {
        const response = await axios.post(`http://127.0.0.1:5000/event/authorize`,
            { event_id: eventId, email },
            {
                withCredentials: true,
            }
        );
        return response.data;
    } catch (error) {
        console.error('Error adding an event manager: ', error.response ? error.response.data : error.message);
        throw error;
    }
};
