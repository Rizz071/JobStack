import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { HashRouter } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { AlertContextProvider } from "./components/Contexts/AlertContext";
import { UserContextProvider } from "./components/Contexts/UserContext";

const queryClient = new QueryClient();

const root = ReactDOM.createRoot(
    document.getElementById("root") as HTMLElement
);
root.render(
    <React.StrictMode>
        <QueryClientProvider client={queryClient}>
            <UserContextProvider>
                <AlertContextProvider>
                    <HashRouter>
                        <App />
                    </HashRouter>
                </AlertContextProvider>
            </UserContextProvider>
        </QueryClientProvider>
    </React.StrictMode>
);
