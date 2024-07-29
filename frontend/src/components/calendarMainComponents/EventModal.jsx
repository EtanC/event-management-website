import CreateEventPopUp from '../CreateEventPopUp';
import EventManagerModal from '../EventManagerModal';
import ActionConfirmationPopup from './ActionConfirmationPopup';

const EventModals = ({
    deleteDialogOpen,
    handleDeleteCancel,
    handleDeleteConfirm,
    openEditEvent,
    handleEditClose,
    eventToEdit,
    openAddManager,
    handleAddManagerClose,
}) => (
    <>
        <ActionConfirmationPopup
            open={deleteDialogOpen}
            onClose={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
            title={'Confirm Delete'}
            content={'Are you sure you want to delete this event? This action cannot be undone.'}
            primaryButtonText={'Delete'}
        />
        <CreateEventPopUp open={openEditEvent} handleClose={handleEditClose} headerText={'Edit Event'} event={eventToEdit} />
        <EventManagerModal open={openAddManager} handleClose={handleAddManagerClose} event={eventToEdit} />
    </>
);

export default EventModals;
