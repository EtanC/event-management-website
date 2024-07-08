import rankingColours from './rankingColours';

const calendarEventStyleGetter = (event) => {
    const backgroundColor = rankingColours[event.resource.ranking];
    return {
        style: {
            backgroundColor,
            borderRadius: '5px',
            opacity: 0.8,
            color: 'white',
            border: '1px solid #ddd',
            display: 'block',
            cursor: 'pointer',
            padding: '2px 4px',          // Add padding
            textAlign: 'center',         // Center text
            overflow: 'hidden',          // Prevent text overflow
            whiteSpace: 'nowrap',        // Prevent text wrapping
            textOverflow: 'ellipsis',    // Show ellipsis for overflow
        }
    };
};

export default calendarEventStyleGetter;