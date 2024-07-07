import { useState, useEffect } from 'react';
import { Box, Button, Typography, Checkbox, FormControlLabel, FormGroup, Accordion, AccordionSummary, AccordionDetails, InputBase, List, ListItem, ListItemText } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const CalendarSidebar = ({ events, onSearchResultClick, onRankingChange }) => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [selectedPriorities, setSelectedPriorities] = useState([]);

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

    const handleRankingChange = (event) => {
        const ranking = event.target.name;
        setSelectedPriorities(prev =>
            prev.includes(ranking)
                ? prev.filter(p => p !== ranking)
                : [...prev, ranking]
        );
    };

    useEffect(() => {
        onRankingChange(selectedPriorities);
    }, [selectedPriorities, onRankingChange]);

    return (
        <Box 
            sx={{ 
                width: { xs: '100%', sm: '250px', md: '300px' },
                backgroundColor: 'white', 
                padding: '20px', 
                borderRight: '1px solid #ddd' , 
                flexShrink: 0,
            }}
        >
            <Button variant="contained" color="primary" fullWidth sx={{ marginBottom: '20px' }}>
                Create
            </Button>

            <Accordion defaultExpanded sx={{ boxShadow: 'none'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Looking for</Typography>
                </AccordionSummary>
                <AccordionDetails>
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
                        <List>
                            {searchResults.map((result, index) => (
                                <ListItem button key={index} onClick={() => onSearchResultClick(result)}>
                                    <ListItemText primary={result.name} />
                                </ListItem>
                            ))}
                        </List>
                    ) : searchTerm ? (
                        <Typography>No search results</Typography>
                    ) : null}
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded sx={{ boxShadow: 'none'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Ranking</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox onChange={handleRankingChange} name="A+" />} label="A+" />
                        <FormControlLabel control={<Checkbox onChange={handleRankingChange} name="A" />} label="A" />
                        <FormControlLabel control={<Checkbox onChange={handleRankingChange} name="B" />} label="B" />
                        <FormControlLabel control={<Checkbox onChange={handleRankingChange} name="C" />} label="C" />
                        <FormControlLabel control={<Checkbox onChange={handleRankingChange} name="Unspecified" />} label="Unspecified" />
                    </FormGroup>
                </AccordionDetails>
            </Accordion>

            <Accordion defaultExpanded sx={{ boxShadow: 'none'}}>
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                    <Typography variant="h6">Event Type</Typography>
                </AccordionSummary>
                <AccordionDetails>
                    <FormGroup>
                        <FormControlLabel control={<Checkbox />} label="All Events" />
                        <FormControlLabel control={<Checkbox />} label="Registered" />
                        <FormControlLabel control={<Checkbox />} label="Saved" />
                    </FormGroup>
                </AccordionDetails>
            </Accordion>
        </Box>
    );
};

export default CalendarSidebar;
