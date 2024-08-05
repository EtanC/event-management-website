import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    fontFamily: 'Impact, scans-serif',
    backgrounColor: '#1E4830',
    palette: {
        primary: {
            main: '#1E4830'
        },
        secondary: {
            main: '#FFFFFF'
        }
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