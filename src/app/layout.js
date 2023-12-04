"use client";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import theme from "../styles/LightThemeMUI";
import { store } from "@/hooks/store";
import "@/app/ui/globals.css";
import RoutesProtection from "@/app/routesProtection";
import { Provider } from "react-redux";

export default function RootLayout({ children }) {
  return (
    <MUIThemeProvider theme={theme}>
      <html lang="en">
        <Provider store={store}>
          <body>
            <RoutesProtection>              
              {children}  
            </RoutesProtection>
          </body>
        </Provider>
      </html>
    </MUIThemeProvider>
  );
}