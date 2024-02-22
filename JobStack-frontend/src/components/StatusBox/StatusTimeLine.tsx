import React from "react";
import { StatusObject } from "../../types";

interface Props {
    statusArray: StatusObject[];
}


const StatusTimeLine = ({ statusArray }: Props) => {

    if (!statusArray) {
        return (
            <p>No elements</p>
        );
    }

    return (
        <ul className="flex timeline timeline-vertical my-6 mx-6">
            {statusArray.map((statusElement, index, arr) => {
                return (
                    <li key={statusElement.id}>
                        {index !== 0 && <hr className={`my-4 ${statusElement.status.toUpperCase() === "REJECTED" ? "bg-error" : "bg-success"}`} />}
                        <div className="timeline-start"><span
                            className="text-base-content text-xs my-auto font-light">{statusElement.date.toString().split("T")[0]}</span>
                        </div>
                        <div className="timeline-middle mx-1">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"
                                className={`w-5 h-5 ${statusElement.status.toUpperCase() === "REJECTED" ? "text-error" : "text-success"} `}>
                                <path fillRule="evenodd"
                                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                                    clipRule="evenodd" />
                            </svg>
                        </div>
                        <div className="flex flex-col w-20 timeline-end">
                            <p className={`${statusElement.status_desc ? "border-b " : ""} 
                                ${statusElement.status.toUpperCase() === "REJECTED" ? "text-error border-error font-bold" : "text-success border-success"} 
                                w-fit text-xs my-auto`}>{statusElement.status.toUpperCase()}</p>
                            {statusElement.status_desc && <p className="text-base-content text-xs my-auto">
                                {statusElement.status_desc}</p>}
                        </div>
                        {index !== arr.length - 1 && <hr className="bg-success" />}
                    </li>
                );
            })}
        </ul>
    );
};

export default StatusTimeLine;
