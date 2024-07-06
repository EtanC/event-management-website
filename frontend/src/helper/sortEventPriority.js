//sort event by priority then alphabetically if same priority

const sortEventPriority = (events) => {
    if (!Array.isArray(events)) {
        return []; // Return an empty array if events is not an array
    }

    return events
        .map(event => ({
            ...event,
            priority: event.priority ?? 0, // Assign priority 0 if it doesn't exist, just in case
        }))
        .sort((a, b) => {
            if (a.priority === b.priority) {
                return a.name.localeCompare(b.name);
            }
            return a.priority - b.priority;
        })
        .map(event => ({
            title: event.name,
            start: new Date(event.start_date),
            end: new Date(event.deadline),
            allDay: true,
            resource: event,
        }));
};

export default sortEventPriority;

