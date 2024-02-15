import axios from "axios";
import { JobItem } from "../src/types";
import React from "react";

/*Narrowing JobItem type*/
const isJobItem = (object: unknown): object is JobItem => {
    return !!(object && typeof object === "object"
        && "id" in object && typeof object.id === "number"
        && "job_title" in object && typeof object.job_title === "string"
        && "job_desc" in object && typeof object.job_desc === "string"
        && "date_of_apply" in object && typeof object.date_of_apply === "string"
        && "current_status_desc" in object && typeof object.current_status_desc === "string"
        && "active" in object && typeof object.active === "boolean");
};

/*Narrowing Array of JobItem*/
const isJobItemArray = (object: unknown[]): object is JobItem[] => {
    return object.every(i => isJobItem((i)));
};

/*Requesting all jobs from backend*/
const requestJobList = async (setJobsList: React.Dispatch<React.SetStateAction<JobItem[]>>) => {
    try {
        const response: unknown = await axios.get(
            "http://127.0.0.1:3001/api/jobs/1"
        );

        if (!response
            || typeof response !== "object"
            || !("data" in response)
            || !(Array.isArray(response.data))
        ) {
            throw new Error("error while retrieving job list from server");
        }

        const data: unknown[] = response.data;

        if (data && isJobItemArray(data)) setJobsList(data);
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("unknown server error", error);
        }
    }
};

const deleteJob = async (id: number) => {
    try {

        /* Deleting job entity with ON DELETE CASCADE,
         * so will be deleted also status rows in job_status table
         */
        const response: unknown = await axios.delete(
            `http://127.0.0.1:3001/api/jobs/${id}`
        );

        /* Narrowing response from server and checking code 204 */
        if (
            !response ||
            typeof response !== "object" ||
            !("status" in response) ||
            response.status !== 204
        )
            throw new Error("error while deleting entity");

    } catch (error) {
        if (error instanceof Error) {
            throw new Error(
                "unknown server error occured while attemped to delete item from server",
                error
            );
        }
    }
}


export default {
    requestJobList, deleteJob
};