import axios from 'axios';
import config from '../config';

export const fetchEventsData = async (setEvents, setLocations, setError, setIsLoading) => {
    setIsLoading(true);
    try {
        const response = await axios.get(`${config.apiBaseUrl}/events/get/all`);
        const eventData = response.data.events || response.data; // Adjust according to the response structure
        setEvents(eventData);
        const uniqueLocations = [...new Set(eventData.map(event => event.location).filter(loc => loc))];
        setLocations(uniqueLocations);
        setError(null);
    } catch (err) {
        setError('Failed to fetch events: ' + err);
    } finally {
        setIsLoading(false);
    }
};

export const handleCreateEvent = async (eventData) => {
    try {
        const response = await axios.post(`${config.apiBaseUrl}/event/create`,
            {
                'deadline': eventData.deadline,
                'details': eventData.details,
                'details_link': eventData.details_link,
                'name': eventData.name,
                'location': eventData.location,
                'start_date': eventData.start_date,
                'tags': eventData.tags
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
        const response = await axios.get(`${config.apiBaseUrl}/user/manage/events`,
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
        const response = await axios.get(`${config.apiBaseUrl}/user/events`, {
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
        const response = await axios.post(`${config.apiBaseUrl}/user/unregister/${event_id}`, {}, {
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
        const response = await axios.put(`${config.apiBaseUrl}/event/update/${event_id}`,
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
        const response = await axios.delete(`${config.apiBaseUrl}/event/delete/${event_id}`, {
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
        const response = await axios.post(`${config.apiBaseUrl}/event/authorize`,
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

export const increaseEventViewCount = async (event_id) => {
    try {
        await axios.post(`${config.apiBaseUrl}/event/view_count/${event_id}`);
    } catch (error) {
        console.error("Failed to increment view count:", error);
    }
};