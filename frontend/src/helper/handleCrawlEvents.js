import axios from 'axios';
import config from '../config'

const handleCrawlEvents = async (setIsLoading, setIsCrawling) => {
    try {
        setIsLoading(true);
        setIsCrawling(true);
        await axios.post(`${config.apiBaseUrl}/events/crawl`);
    } catch (error) {
        console.error('Error crawling events', error);
    } finally {
        setIsCrawling(false);
        setIsLoading(false);
    }
};

export default handleCrawlEvents;
