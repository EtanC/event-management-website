import React, { useState } from 'react';
import FloatingButton from './FloatingButton';
import EventModal from './EventModal';

const NewEventButton = () => {
    const [open, setOpen] = useState(false);

    const handleOpenNewEvent = () => {
        setOpen(true);
    };

    const handleCloseNewEvent = () => {
        setOpen(false);
    };

    return (
        <div>
            <FloatingButton onClick={handleOpenNewEvent} />
            <EventModal open={open} handleClose={handleCloseNewEvent} headerText={'Create New Event'} />
        </div>
    );
};

export default NewEventButton;