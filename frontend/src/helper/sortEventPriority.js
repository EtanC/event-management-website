//sort event by priority then alphabetically if same priority

const transformEvents = (events) => {
    return events
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

export default transformEvents;
