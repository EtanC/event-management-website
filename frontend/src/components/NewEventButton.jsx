import React, { useState } from 'react';
import FloatingButton from './FloatingButton';
import NewEvent from './NewEvent';

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
            <NewEvent open={open} handleClose={handleCloseNewEvent} />
        </div>
    );
};

export default NewEventButton;