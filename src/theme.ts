'use client';
import { createTheme } from '@mui/material/styles';
import { Outfit } from "next/font/google";

// Load the Merriweather font
const outfit = Outfit({ subsets: ['latin'], weight: ['300', '400', '700', '900'] });

const theme = createTheme({
  palette: {
    primary: {
      main: '#FFCF00',
    },
    secondary: {
      main: '#1E1E1E',
    },
  },
  typography: {
    fontFamily: `${outfit.style.fontFamily}`,
  }
});

export default theme;