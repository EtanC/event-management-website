import { useState, useEffect } from 'react';
import { Box, Typography, Accordion, AccordionSummary, AccordionDetails, InputBase, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

// eslint-disable-next-line react/prop-types
const CalendarSearchBar = ({ events, onSearchResultClick, searchTerm, setSearchTerm }) => {
    const [searchResults, setSearchResults] = useState([]);

    useEffect(() => {
        if (searchTerm) {
            const results = (Array.isArray(events) ? events : []).filter(event =>
                event.name.toLowerCase().includes(searchTerm.toLowerCase())
            );
            setSearchResults(results);
        } else {
            setSearchResults([]);
        }
    }, [searchTerm, events]);

    return (
        <Accordion defaultExpanded sx={{ boxShadow: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Looking for</Typography>
            </AccordionSummary>
            <AccordionDetails sx={{ position: 'relative' }}>
                <InputBase
                    placeholder="Text"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    fullWidth
                    sx={{
                        padding: '10px',
                        borderBottom: '1px solid #ddd',
                    }}
                />
                {searchResults.length > 0 ? (
                    <List sx={{ position: 'absolute', top: '100%', left: 0, right: 0, zIndex: 10, maxHeight: '200px', overflowY: 'auto', backgroundColor: 'white', border: '1px solid #ddd' }}>
                        {searchResults.map((result, index) => (
                            <ListItem button key={index} onClick={() => onSearchResultClick(result)}>
                                <Box display="flex" justifyContent="space-between" width="100%" sx={{ alignItems: 'center' }}>
                                    <ListItemText 
                                        primary={
                                            <Typography variant="subtitle1"> {/* Make the title smaller */}
                                                {result.name}
                                            </Typography>
                                        } 
                                    />
                                    <Typography variant="body2" align="right" sx={{ minWidth: '80px', marginLeft: '10px', textAlign: 'center' }}> 
                                        {result.start_date}
                                    </Typography>
                                </Box>
                            </ListItem>
                        ))}
                    </List>
                ) : searchTerm ? (
                    <Typography>No search results</Typography>
                ) : null}
            </AccordionDetails>
        </Accordion>
    );
};

export default CalendarSearchBar;
