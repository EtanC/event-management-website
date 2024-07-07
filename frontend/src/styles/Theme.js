import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    fontFamily: 'Impact, scans-serif',
    palette: {
        primary: {
        main: '#1E4830'
        },
    },
    typography: {
        fontFamily: 'Inter, sans-serif',
        allVariants: {
            color: '#1E4830',
        },
    },
    components: {
        MuiAccordionSummary: {
            styleOverrides: {
                expandIcon: {
                    color: '#1E4830',
                },
            },
        },
    },
});

export default theme;