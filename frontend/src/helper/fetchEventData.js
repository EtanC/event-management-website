import axios from 'axios';
import config from '../config';


const fetchEventsData = async (setEvents, setLocations, setError, setIsLoading, page, setPageCount, eventType, location, date, tags, sortBy) => {
    setIsLoading(true);
    try {
        const queryParams = new URLSearchParams();
        
        if (eventType) queryParams.append('name', eventType);
        if (location) queryParams.append('location', location);
        if (date) queryParams.append('date', date);
        if (tags && tags.length > 0) {
            tags.forEach(tag => queryParams.append('tags', tag));
        }
        if (sortBy) queryParams.append('sort_by', sortBy);

    
        const queryString = queryParams.toString();
        const url = `${config.apiBaseUrl}/events/get_page/${page}?${queryString}`;

        const response = await axios.get(url);
        const eventData = response.data.events;
        setPageCount(response.data.page_count);
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