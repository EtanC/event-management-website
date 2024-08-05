import axios from 'axios';
import config from '../config';

const generateAIDescription = async (setAiDescPopupOpen, setLoadingAiDescription, setErrorPopupOpen) => {
    try {
        setAiDescPopupOpen(false);
        setLoadingAiDescription(true);
        await axios.post(`${config.apiBaseUrl}/events/ai-description`);
    } catch (error) {
        setErrorPopupOpen(true);
        console.error('Failed to generate AI description:', error);
        throw error;
    } finally {
        setLoadingAiDescription(false);
    }
};

export default generateAIDescription;
