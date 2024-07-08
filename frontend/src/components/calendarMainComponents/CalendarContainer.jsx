import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { Box, CircularProgress, Typography, useTheme } from '@mui/material';
import eventStyleGetter from '../../helper/calendarEventStyleGetter';

const localizer = momentLocalizer(moment);

// eslint-disable-next-line react/prop-types
const CalendarContainer = ({ isLoading, error, calendarEvents, handleEventClick }) => {
    const theme = useTheme(); // Access the theme

    return (
        <Box sx={{ width: '100%', height: '100%', padding: '20px', backgroundColor: theme.palette.background.paper }}>
            {isLoading ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <CircularProgress />
                </Box>
            ) : error ? (
                <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                    <Typography variant="h6" color={theme.palette.error.main}>
                        {error}
                    </Typography>
                </Box>
            ) : (
                <Box sx={{ height: '100%', width: '100%' }}>
                    <Calendar
                        localizer={localizer}
                        events={calendarEvents.length ? calendarEvents : []}
                        startAccessor="start"
                        endAccessor="end"
                        eventPropGetter={eventStyleGetter}
                        style={{ height: '100%' }}
                        onSelectEvent={handleEventClick}
                        views={['month', 'week', 'day', 'agenda']}
                    />
                </Box>
            )}
        </Box>
    );
};

export default CalendarContainer;
