import axios from "axios";
import { StatusObject, NewStatusObject } from "../src/types";

/*Narrowing StatusObject type*/
const isStatusObject = (object: unknown): object is StatusObject => {
    return !!(
        object &&
        typeof object === "object" &&
        "id" in object &&
        typeof object.id === "number" &&
        "job_id" in object &&
        typeof object.job_id === "number" &&
        "status" in object &&
        typeof object.status === "string" &&
        "status_desc" in object &&
        typeof object.status_desc === "string" &&
        "date" in object &&
        "position" in object &&
        typeof object.position === "number"
    );
};

/*Narrowing Array of StatusObject */
const isStatusObjectArray = (object: unknown[]): object is StatusObject[] => {
    return object.every((i) => isStatusObject(i));
};

// /*Requesting all statuses from backend*/
const requestJobStatusList = async (job_id: number) => {
    try {
        const response: unknown = await axios.get(`/api/status/${job_id}`);

        /* Narrowing type Status Object*/
        if (
            !response ||
            typeof response !== "object" ||
            !("data" in response) ||
            !Array.isArray(response.data)
        )
            throw new Error("error while retrieving job list from server");

        /* Converting date without timezone from server to local timezone */
        response.data.forEach(
            (data) => (data.date = new Date(Date.parse(data.date)))
        );

        const data: unknown[] = response.data;

        if (data && isStatusObjectArray(data)) return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error while requesting statuses from backend");
        }
    }
    return [];
};

/* Requesting mnultiple jobs from backend
 * XMLHttpRequest ignores the body of the request in case the method is GET,
 * so we are using POST request now */
const requestMultipleJobStatusList = async (jobs_array: number[]) => {
    // console.log("jobs_array", jobs_array);
    try {
        const response: unknown = await axios.post("/api/status/multiple", {
            jobs_array,
        });

        /* Narrowing type Status Object*/
        if (
            !response ||
            typeof response !== "object" ||
            !("data" in response) ||
            !Array.isArray(response.data)
        ) {
            console.error("error while retrieving job list from server");
            return [] as StatusObject[];
        }
        /* Converting date without timezone from server to local timezone */
        response.data.forEach(
            (data) => (data.date = new Date(Date.parse(data.date)))
        );

        const data: unknown[] = response.data;

        // console.log(data);
        if (data && isStatusObjectArray(data)) return data;
    } catch (error) {
        if (error instanceof Error) {
            console.error("Error while requesting statuses from backend");
        }
    }
    return [] as StatusObject[];
};

const addStatus = async (job_id: number, newStatusObject: NewStatusObject) => {
    try {
        const response: unknown = await axios.post(
            `/api/status/${job_id}`,
            newStatusObject,
            {
                headers: {
                    "Content-Type": "application/json",
                },
            }
        );

        /* Narrowing response */
        if (
            !response ||
            typeof response !== "object" ||
            !("status" in response) ||
            !("data" in response) ||
            !isStatusObject(response.data)
        ) {
            throw Error("Error: server did not properly respond");
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};

export default {
    requestJobStatusList,
    requestMultipleJobStatusList,
    addStatus,
};
