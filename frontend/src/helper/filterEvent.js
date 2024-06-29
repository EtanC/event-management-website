const filterEvents = (events, eventType, location, date) => {
    let filteredEvents = events;

    if (eventType) {
        filteredEvents = filteredEvents.filter(event =>
            event.name.toLowerCase().includes(eventType.toLowerCase())
        );
    }

    if (location) {
        filteredEvents = filteredEvents.filter(event =>
            event.location.toLowerCase().includes(location.toLowerCase())
        );
    }

    if (date) {
        filteredEvents = filteredEvents.filter(event =>
            new Date(event.start_date) >= new Date(date)
        );
        filteredEvents = filteredEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
    }

    return filteredEvents;
};

export default filterEvents;
