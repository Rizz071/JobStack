/* eslint-disable indent */
import React, { useState } from "react";
import { createContext } from "react";
import { AlertsType } from "../../types";

const AlertContext = createContext<AlertsType>({
    alerts: [],
    setAlerts: () => {},
});

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
