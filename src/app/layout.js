import { Inter } from 'next/font/google'
import { ThemeProvider as MUIThemeProvider } from '@mui/material/styles';
import theme from '../styles/LightThemeMUI';
import './globals.css';

const inter = Inter({ subsets: ['latin'] })

export const metadata = {
  title: 'Mi turno web',
  description: 'P5 | Proyecto de Mi turno web',
}

export default function RootLayout({ children }) {
  return (
    <MUIThemeProvider theme={theme}>
      <html lang="en">
        <body>
          {children}
        </body>
      </html>
    </MUIThemeProvider>
  );
}