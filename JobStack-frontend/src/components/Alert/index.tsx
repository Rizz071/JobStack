import React from "react";
import { useContext } from "react";
import AlertContext from "../Contexts/AlertContext";
import { AlertsType } from "../../types";

interface Props {
    message: string;
}

const Alert = ({ message }: Props) => {
    /* Access to global context AlertContext */
    const { alerts, setAlerts } = useContext(AlertContext) as AlertsType;

    setTimeout(() => {
        setAlerts(alerts.filter((alert) => alert !== message));
    }, 3000);

    return (
        <div
            role="alert"
            className="alert mt-4 place-content-center rounded-none border border-neutral-content bg-base-100 text-sm shadow"
        >
            <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                className="h-6 w-6 shrink-0 stroke-info"
            >
                <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                ></path>
            </svg>
            <span className="">{message}</span>
        </div>
    );
};

export default Alert;
