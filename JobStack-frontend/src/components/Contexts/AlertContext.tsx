/* eslint-disable indent */
import React, { useState } from "react";
import { createContext } from "react";

interface AlertsType {
    alerts: string[];
    setAlerts: React.Dispatch<React.SetStateAction<string[]>>;
}

const AlertContext = createContext<AlertsType | null>(null);

interface Props {
    children: React.ReactNode;
}

export const AlertContextProvider = (props: Props) => {
    const [alerts, setAlerts] = useState<string[]>([]);

    return (
        <AlertContext.Provider value={{ alerts, setAlerts }}>
            {props.children}
        </AlertContext.Provider>
    );
};

export default AlertContext;
