import { FormControlLabel, Checkbox, FormGroup, Accordion, AccordionSummary, AccordionDetails, Typography } from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import rankingColours from '../../helper/rankingColours';

// eslint-disable-next-line react/prop-types, no-unused-vars
const RankingAccordion = ({ selectedRankings, handleRankingChange }) => {
    return (
        <Accordion defaultExpanded sx={{ boxShadow: 'none' }}>
            <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                <Typography variant="h6">Ranking</Typography>
            </AccordionSummary>
            <AccordionDetails>
                <FormGroup sx={{ overflow: 'scroll' }}>
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={handleRankingChange}
                                name="A+"
                                sx={{
                                    '&.Mui-checked': {
                                        color: rankingColours[4],
                                    }
                                }}
                            />
                        }
                        label="A+"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={handleRankingChange}
                                name="A"
                                sx={{
                                    '&.Mui-checked': {
                                        color: rankingColours[3],
                                    }
                                }}
                            />
                        }
                        label="A"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={handleRankingChange}
                                name="B"
                                sx={{
                                    '&.Mui-checked': {
                                        color: rankingColours[2],
                                    }
                                }}
                            />
                        }
                        label="B"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={handleRankingChange}
                                name="C"
                                sx={{
                                    '&.Mui-checked': {
                                        color: rankingColours[1],
                                    }
                                }}
                            />
                        }
                        label="C"
                    />
                    <FormControlLabel
                        control={
                            <Checkbox
                                onChange={handleRankingChange}
                                name="Unspecified"
                                sx={{
                                    '&.Mui-checked': {
                                        color: rankingColours[0],
                                    }
                                }}
                            />
                        }
                        label="Unspecified"
                    />
                </FormGroup>
            </AccordionDetails>
        </Accordion>
    );
};

export default RankingAccordion;
