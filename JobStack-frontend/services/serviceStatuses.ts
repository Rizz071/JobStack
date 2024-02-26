import axios from "axios";
import { StatusObject, NewStatusObject } from "../src/types";

/*Narrowing StatusObject type*/
const isStatusObject = (object: unknown): object is StatusObject => {
    return !!(object && typeof object === "object"
        && "id" in object && typeof object.id === "number"
        && "job_id" in object && typeof object.job_id === "number"
        && "status" in object && typeof object.status === "string"
        && "status_desc" in object && typeof object.status_desc === "string"
        && "date" in object
        && "position" in object && typeof object.position === "number");
};


/*Narrowing Array of StatusObject */
const isStatusObjectArray = (object: unknown[]): object is StatusObject[] => {
    return object.every(i => isStatusObject((i)));
};

// /*Requesting all jobs from backend*/
const requestJobStatusList = async (job_id: number) => {
    try {
        const response: unknown = await axios.get(`/api/status/${job_id}`);

        /* Narrowing type Status Object*/
        if (!response
            || typeof response !== "object"
            || !("data" in response)
            || !Array.isArray(response.data))
            throw new Error("error while retrieving job list from server");


        const data: unknown[] = response.data;

        // console.log(data);
        if (data && isStatusObjectArray(data)) return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Error while requesting statuses from backend");
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
        const response: unknown = await axios.post("/api/status/multiple", { jobs_array });

        /* Narrowing type Status Object*/
        if (!response
            || typeof response !== "object"
            || !("data" in response)
            || !Array.isArray(response.data))
            return new Error("error while retrieving job list from server");


        const data: unknown[] = response.data;

        // console.log(data);
        if (data && isStatusObjectArray(data)) return data;
    } catch (error) {
        if (error instanceof Error) {
            throw new Error("Error while requesting statuses from backend");
        }
    }
    return [];
};


const addStatus = async (job_id: number, newStatusObject: NewStatusObject) => {

    try {
        const response: unknown = await axios.post(
            `/api/status/${job_id}`,
            newStatusObject,
            {
                headers: {
                    "Content-Type": "application/json",
                }
            }
        );

        /* Narrowing response */
        if (!response
            || typeof response !== "object"
            || !("status" in response)
            || !("data" in response)
            || !isStatusObject(response.data)

        ) {
            throw Error("Error: server did not properly respond");
        }
    } catch (error) {
        if (error instanceof Error) {
            console.log(error.message);
        }
    }
};


// const deleteJob = async (id: number) => {
//     try {
//         /* Deleting job entity with ON DELETE CASCADE,
//          * so will be deleted also status rows in job_status table
//          */
//         const response: unknown = await axios.delete(`/api/jobs/${id}`);

//         /* Narrowing response from server and checking code 204 */
//         if (
//             !response ||
//             typeof response !== "object" ||
//             !("status" in response) ||
//             response.status !== 204
//         )
//             throw new Error("error while deleting entity");

//         // return response;
//     } catch (error) {
//         if (error instanceof Error) {
//             throw new Error("Unknown server error occured while attemped to delete item from server");
//         }
//     }
// };

// const putJob = async (jobToPut: JobItem) => {

//     try {
//         const response: unknown = await axios.put<JobItem>(
//             `/api/job/${jobToPut.id}`,
//             jobToPut
//         );

//         /* Narrowing response from server and checking code 204 */
//         if (
//             !response ||
//             typeof response !== "object" ||
//             !("status" in response) ||
//             response.status !== 201
//         )
//             throw new Error("error while changing entity on server");

//     } catch (error) {
//         if (error instanceof Error) {
//             throw new Error(
//                 "unknown server error occured while attemped to delete item from server",
//                 error
//             );
//         }
//     }
// };

export default {
    requestJobStatusList, requestMultipleJobStatusList, addStatus
};