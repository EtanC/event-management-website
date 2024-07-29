import { handleDeleteEvent } from './handleEventData';

export const handleDeleteCancel = (setDeleteDialogOpen, setEventToDelete) => {
    setDeleteDialogOpen(false);
    setEventToDelete(null);
};

export const handleEditClick = (event, setEventToEdit, setOpenEditEvent) => {
    setEventToEdit(event);
    setOpenEditEvent(true);
    console.log(event)
};

export const handleAddManagerClick = (event, setEventToEdit, setOpenAddManager) => {
    setEventToEdit(event);
    setOpenAddManager(true);
};

export const handleEditClose = (setOpenEditEvent, fetchEvents) => {
    setOpenEditEvent(false);
    fetchEvents();
};

export const handleAddManagerClose = (setOpenAddManager, fetchEvents) => {
    setOpenAddManager(false);
    fetchEvents();
};

export const handleDeleteClick = (event, setEventToDelete, setDeleteDialogOpen) => {
    setEventToDelete(event);
    setDeleteDialogOpen(true);
};

export const handleDeleteConfirm = async (eventToDelete, setDeleteDialogOpen, setEventToDelete, fetchEvents) => {
    if (eventToDelete) {
        try {
            await handleDeleteEvent(eventToDelete._id);
            setDeleteDialogOpen(false);
            setEventToDelete(null);
            fetchEvents();
        } catch (error) {
            console.error('Failed to delete event:', error);
            alert('Failed to delete event. Please try again later.');
        }
    }
};
