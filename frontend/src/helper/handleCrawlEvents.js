import axios from 'axios';

const handleCrawlEvents = async () => {
    try {
        const response = await axios.post('http://127.0.0.1:5000/events/crawl');
    } catch (error) {
        console.error('Error crawling events', error);
    }
};

export default handleCrawlEvents;
