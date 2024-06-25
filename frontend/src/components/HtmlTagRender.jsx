import PropTypes from 'prop-types';
import DOMPurify from 'dompurify';
import '../styles/HtmlTagRender.css';

function HtmlTagRender({ htmlString }) {
    console.log(htmlString)
    const sanitizedHTML = DOMPurify.sanitize(htmlString);

    return (
        <div className="event-detail" dangerouslySetInnerHTML={{ __html: sanitizedHTML }} />
    );
}

HtmlTagRender.propTypes = {
    htmlString: PropTypes.string.isRequired,
};

export default HtmlTagRender;
