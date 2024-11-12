// src/styles/theme.ts
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
    palette: {
        primary: {
            main: "#3b82f6", // Tailwind's blue-500 color
        },
        secondary: {
            main: "#10b981", // Tailwind's green-500 color
        },
    },
    typography: {
        fontFamily: "'Roboto', sans-serif",
    },
});

export default theme;
