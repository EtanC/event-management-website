import CreateEventPopUp from '../CreateEventPopUp';
import EventManagerModal from '../EventManagerModal';
import AlertPopup from './DeleteEventAlertPopup';

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
        <AlertPopup
            open={deleteDialogOpen}
            onClose={handleDeleteCancel}
            onConfirm={handleDeleteConfirm}
            title={'Confirm Delete'}
            content={'Are you sure you want to delete this event? This action cannot be undone.'}
        />
        <CreateEventPopUp open={openEditEvent} handleClose={handleEditClose} headerText={'Edit Event'} event={eventToEdit} />
        <EventManagerModal open={openAddManager} handleClose={handleAddManagerClose} event={eventToEdit} />
    </>
);

export default EventModals;
