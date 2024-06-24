import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import '../styles/EventDetailRender.css';

function EventDetailRender({ htmlString }) {
    console.log(htmlString)
    const sanitizedHTML = DOMPurify.sanitize(htmlString);

    return (
        <div className="event-detail" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
    );
}

EventDetailRender.propTypes = {
    htmlString: PropTypes.string.isRequired,
};

export default EventDetailRender;
