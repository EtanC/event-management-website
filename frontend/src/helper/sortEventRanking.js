//sort event by ranking then alphabetically if same ranking

const isValidDate = (date) => {
    return !isNaN(Date.parse(date));
};

const formatDateString = (date) => {
    const options = { year: 'numeric', month: 'short', day: 'numeric' };
    const parsedDate = new Date(date);
    if (isNaN(parsedDate.getTime())) {
        return new Date().toLocaleDateString('en-US', options); // fallback to the current date if the date is invalid
    }
    return parsedDate.toLocaleDateString('en-US', options); // format date as "Oct 22, 2024"
};

const sortEventRanking = (events) => {
    if (!Array.isArray(events)) {
        return [];
    }
    return events
        .map(event => ({
            ...event,
            ranking: event.ranking ?? 0, // assign ranking 0 if it doesn't exist, just in case
        }))
        .sort((a, b) => {
            if (a.ranking === b.ranking) {
                return a.name.localeCompare(b.name);
            }
            return b.ranking - a.ranking; // sort in descending order of ranking
        })
        .map(event => ({
            title: event.name,
            start: formatDateString(event.start_date), // assuming start is never invalid, :)
            end: isValidDate(event.end_date) ? formatDateString(event.end_date) : formatDateString(event.start_date),
            allDay: true,
            resource: event,
        }));
        
};

export default sortEventRanking;

