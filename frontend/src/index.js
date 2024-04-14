import React from "react";
import { createRoot } from "react-dom/client";
import "./tailwind.generated.css";
import {
    ThemeProvider,
    StyledEngineProvider,
    createTheme,
} from "@mui/material/styles";
import App from "./App";
import { AuthProvider } from "./utils/contexts/AuthContext";
import { BrowserRouter } from "react-router-dom";
import { CookiesProvider } from "react-cookie";
import "react-toastify/dist/ReactToastify.css";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);

const theme = createTheme({
    components: {
        MuiModal: {
            defaultProps: {
                container: rootElement,
            },
        },
    },
});

root.render(
    <StyledEngineProvider injectFirst>
        <ThemeProvider theme={theme}>
            <BrowserRouter>
                <AuthProvider>
                    <CookiesProvider defaultSetOptions={{ path: "/" }}>
                        <App />
                    </CookiesProvider>
                </AuthProvider>
            </BrowserRouter>
        </ThemeProvider>
    </StyledEngineProvider>
);
