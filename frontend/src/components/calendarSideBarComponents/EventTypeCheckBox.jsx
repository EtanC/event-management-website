import { FormControlLabel, Checkbox, FormGroup, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';

const EventTypeAccordion = () => {
    return (
        <Accordion defaultExpanded sx={{ boxShadow: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Event Type</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup sx={{ overflow: 'scroll' }}>
                    <FormControlLabel control={<Checkbox />} label="All Events" />
                    <FormControlLabel control={<Checkbox />} label="Registered" />
                    <FormControlLabel control={<Checkbox />} label="Saved" />
                </FormGroup>
            </AccordionDetails>
        </Accordion>
    );
};

export default EventTypeAccordion;
