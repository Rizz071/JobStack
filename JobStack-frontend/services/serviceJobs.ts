import axios from "axios";
import { JobItem } from "../src/types";

/*Narrowing JobItem type*/
const isJobItem = (object: unknown): object is JobItem => {
    return !!(
        object &&
        typeof object === "object" &&
        "id" in object &&
        typeof object.id === "number" &&
        "job_title" in object &&
        typeof object.job_title === "string" &&
        "job_desc" in object &&
        typeof object.job_desc === "string" &&
        "date_of_apply" in object &&
        typeof object.date_of_apply === "string" &&
        "current_status_desc" in object &&
        typeof object.current_status_desc === "string" &&
        "active" in object &&
        typeof object.active === "boolean"
    );
};

/*Narrowing Array of JobItem*/
const isJobItemArray = (object: unknown[]): object is JobItem[] => {
    return object.every((i) => isJobItem(i));
};

/*Requesting all jobs from backend*/
const requestJobList = async (user_id: number | undefined) => {
    if (!user_id) return [];
    try {
        const response: unknown = await axios.get(`/api/jobs/${user_id}`);

        if (
            !response ||
            typeof response !== "object" ||
            !("data" in response) ||
            !Array.isArray(response.data)
        ) {
            throw new Error("error while retrieving job list from server");
        }

        /* Converting date without timezone from server to local timezone */
        // response.data.forEach(
        //     (data) =>
        //         (data.date_of_apply = new Date(
        //             Date.parse(data.date_of_apply)
        //         ).toLocaleDateString())
        // );

        const data: unknown[] = response.data;

        if (data && isJobItemArray(data)) return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("unknown server error");
        }
    }
    return [];
};

/*Requesting all jobs from backend*/
const requestJobById = async (job_id: number | undefined) => {
    if (!job_id) return null;
    try {
        const response: unknown = await axios.get(`/api/job/${job_id}`);

        if (
            !response ||
            typeof response !== "object" ||
            !("data" in response)
        ) {
            throw new Error("error while retrieving job list from server");
        }
        const data: unknown = response.data;

        if (data && isJobItem(data)) return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("unknown server error");
        }
    }
    return null;
};

const deleteJob = async (id: number) => {
    try {
        /* Deleting job entity with ON DELETE CASCADE,
         * so will be deleted also status rows in job_status table
         */
        const response: unknown = await axios.delete(`/api/jobs/${id}`);

        /* Narrowing response from server and checking code 204 */
        if (
            !response ||
            typeof response !== "object" ||
            !("status" in response) ||
            response.status !== 204
        )
            throw new Error("error while deleting entity");

        // return response;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(
                "Unknown server error occured while attemped to delete item from server"
            );
        }
    }
};

const putJob = async (jobToPut: JobItem) => {
    try {
        const response: unknown = await axios.put<JobItem>(
            `/api/job/${jobToPut.id}`,
            jobToPut
        );

        /* Narrowing response from server and checking code 204 */
        if (
            !response ||
            typeof response !== "object" ||
            !("status" in response) ||
            response.status !== 201
        )
            throw new Error("error while changing entity on server");
    } catch (error) {
        if (error instanceof Error) {
            throw new Error(
                "unknown server error occured while attemped to delete item from server",
                error
            );
        }
    }
};

export default {
    requestJobList,
    requestJobById,
    deleteJob,
    putJob,
};
