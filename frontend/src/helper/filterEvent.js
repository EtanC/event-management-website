// this makes sure that the event name doesnt contain spaces
const sanitizeString = (str) => {
    return str ? str.toString().toLowerCase().trim() : '';
};

const filterEvents = (events, eventType, location, date) => {
    let filteredEvents = events;
    // Ensure events is an array, if not return nothing
    if (!Array.isArray(events)) {
        return [];
    }

    if (eventType) {
        filteredEvents = filteredEvents.filter(event =>
            sanitizeString(event.name).toLowerCase().includes(eventType.toLowerCase())
        );
    }

    if (location) {
        console.log(location)
        filteredEvents = filteredEvents.filter(event =>
            sanitizeString(event.location).toLowerCase().includes(location.toLowerCase())
        );
    }

    if (date) {
        filteredEvents = filteredEvents.filter(event =>
            new Date(event.start_date) >= new Date(date)
        );
        filteredEvents = filteredEvents.sort((a, b) => new Date(a.start_date) - new Date(b.start_date));
    }

    return filteredEvents;
};

export default filterEvents;