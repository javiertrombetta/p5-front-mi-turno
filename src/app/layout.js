"use client";
import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import theme from "../styles/LightThemeMUI";
import { store } from "../hooks/store";
import "@/app/ui/globals.css";
import { inter } from "@/app/ui/fonts";
import RoutesProtection from "./routesProtection";
import { Provider } from "react-redux";

// export const metadata = {
//   title: "Mi turno web",
//   description: "P5 | Proyecto de Mi turno web",
// };

export default function RootLayout({ children }) {
  return (
    <MUIThemeProvider theme={theme}>
      <html lang="en">
        <Provider store={store}>
          <body>
            <RoutesProtection>
              <div style={{ marginTop: "3em", minHeight: "calc(100vh - 128px)" }}>
                {children}
              </div>
            </RoutesProtection> 
          </body>
        </Provider>
      </html>
    </MUIThemeProvider>
  );
}
