import { ThemeProvider as MUIThemeProvider } from "@mui/material/styles";
import Navbar from "@/commons/Navbar";
import Footer from "@/commons/Footer";
import theme from "../styles/LightThemeMUI";
import "./globals.css";

export const metadata = {
  title: "Mi turno web",
  description: "P5 | Proyecto de Mi turno web",
};

export default function RootLayout({ children }) {
  return (
    <MUIThemeProvider theme={theme}>
      <html lang="en">
        <body>
          <Navbar />
          <div style={{ marginTop: "3em", minHeight: "calc(100vh - 128px)" }}>
            {children}
          </div>
          <Footer />
        </body>
      </html>
    </MUIThemeProvider>
  );
}
