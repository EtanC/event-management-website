import { useState, useEffect } from 'react';
import { Typography, Box, Container, Button, CircularProgress } from '@mui/material';
import AdminEventsSearchBar from './AdminEventsSearchBar';
import AdminTable from './AdminTable';
import ActionConfirmationPopup from '../popups/ActionConfirmationPopup';
import CreateEventPopUp from '../popups/CreateEventPopUp';
import { fetchEventsData } from '../../helper/handleEventData';
import {
    handleDeleteClick,
    handleDeleteCancel,
    handleDeleteConfirm,
    handleEditClick,
    handleEditClose,
} from '../../helper/handleEditDeleteEvent';
import handleCrawlEvents from '../../helper/handleCrawlEvents';
import handleAiDesc from '../../helper/handleAiDesc';
import ConfirmationPopup from '../popups/ConfirmationPopUp';

const AdminEventsPage = () => {
    const [events, setEvents] = useState([]);
    const [eventName, setEventName] = useState('');
    const [location, setLocation] = useState('');
    const [locations, setLocations] = useState([]);
    const [filteredData, setFilteredData] = useState([]);
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isCrawling, setIsCrawling] = useState(false);
    const [loadingAiDescriptions, setLoadingAiDescriptions] = useState(false);
    const [aiDescPopupOpen, setAiDescPopupOpen] = useState(false);
    const [errorPopupOpen, setErrorPopupOpen] = useState(false);

    // delete and edit actions
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [eventToEdit, setEventToEdit] = useState(null);
    const [eventToDelete, setEventToDelete] = useState(null);
    const [openEditEvent, setOpenEditEvent] = useState(false);

    const adminFetchEvents = async () => {
        try {
            setIsLoading(true);
            await fetchEventsData(setEvents, setLocations, setError, setIsLoading);
            setIsLoading(false);
        } catch (error) {
            console.error('Failed to fetch events:', error);
            setError('Failed to load events. Please try again later.');
            setIsLoading(false);
            setEvents([]);
        }
    };

    const filterEvents = (eventName) => {
        return events.filter(event => {
            const eventNameMatch = eventName === null || (event.name && event.name.toLowerCase().includes(eventName.toLowerCase()));
            const locationMatch = location === null || (event.location && event.location.toLowerCase().includes(location.toLowerCase()));
            return eventNameMatch && locationMatch;
        });
    };

    useEffect(() => {
        const result = filterEvents(eventName, location);
        setFilteredData(result);
    }, [eventName, events, location]);

    useEffect(() => {
        adminFetchEvents();
    }, []);

    const columns = [
        { field: 'name', headerName: 'Event Name', width: '30vw' },
        { field: 'location', headerName: 'Location', width: '20vw' },
        { field: 'start_date', headerName: 'Event Date', width: '10vw' }
    ];

    return (
        <>
            <ActionConfirmationPopup
                open={deleteDialogOpen}
                onClose={() => handleDeleteCancel(setDeleteDialogOpen, setEventToDelete)}
                onConfirm={() => handleDeleteConfirm(eventToDelete, setDeleteDialogOpen, setEventToDelete, adminFetchEvents)}
                title={'Confirm Delete'}
                content={'Are you sure you want to delete this event? This action cannot be undone.'}
                primaryButtonText={'Delete'}
            />

            <CreateEventPopUp open={openEditEvent} handleClose={() => handleEditClose(setOpenEditEvent, adminFetchEvents)} headerText={'Edit Event'} event={eventToEdit} />
            {/* Pop ups for the ai button */}
            <ConfirmationPopup
                open={aiDescPopupOpen}
                onClose={() => setAiDescPopupOpen(false)}
                onConfirm={() => {
                    handleAiDesc(setAiDescPopupOpen, setLoadingAiDescriptions, setErrorPopupOpen); // Call the AI description handler with state setters
                }}
                title={'AI Description'}
                content={'Each run will cost money. Are you sure you want to proceed?'}
                confirmText={'Yes, proceed'}
            />
            <ConfirmationPopup
                open={errorPopupOpen}
                onClose={() => setErrorPopupOpen(false)}
                title={'Error'}
                content={"Funds allocated to Chatgpt is dry, please contact website creators"}
                confirmText={'OK'}
                onConfirm={() => setErrorPopupOpen(false)}
            />
            <Container maxWidth="lg" sx={{ minHeight: '85vh' }}>
                <Box display="flex" justifyContent="center" mb={3} gap={2}>
                    <Button 
                        variant='contained' 
                        onClick={() => handleCrawlEvents(setIsLoading, setIsCrawling)} 
                        sx={{ maxWidth: '200px', width: '200px' }}
                    >
                        Crawl New Events
                    </Button>
                    <Button 
                        variant='contained' 
                        onClick={() => setAiDescPopupOpen(true)}
                        sx={{ maxWidth: '200px', width: '200px' }} 
                        disabled={loadingAiDescriptions}
                    >
                        {loadingAiDescriptions ? <CircularProgress size={24} /> : "AI Description"}
                    </Button>
                </Box>
                <AdminEventsSearchBar
                    labelOne='Event Name'
                    labelTwo='Location'
                    eventType={eventName}
                    setEventType={setEventName}
                    location={location}
                    setLocation={setLocation}
                    locations={locations}
                />
                {isLoading || isCrawling ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
                        <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center" height="70vh">
                            <CircularProgress />
                            {isCrawling && (
                                <Typography variant="h6" color="textSecondary" sx={{ mt: 2 }}>
                                    Crawling events, will be a few minutes...
                                </Typography>
                            )}
                        </Box>
                    </Box>
                ) : filteredData.length === 0 ? (
                    <Box display="flex" justifyContent="center" alignItems="center" height="70vh">
                        <Typography variant="h6" color="textSecondary">
                            No search results
                        </Typography>
                    </Box>
                ) : (
                    <AdminTable
                        columns={columns}
                        data={filteredData}
                        handleDelete={(event) => handleDeleteClick(event, setEventToDelete, setDeleteDialogOpen)}
                        handleEdit={(event) => handleEditClick(event, setEventToEdit, setOpenEditEvent)}
                        showActions={true}
                        showDropdown={false}
                    />
                )}
            </Container>
        </>
    );
};

export default AdminEventsPage;
