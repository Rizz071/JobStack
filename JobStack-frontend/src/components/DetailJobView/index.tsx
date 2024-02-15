import React from "react";
import { useEffect, useState } from "react";
import { JobItem } from "../../types";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import serviceJobs from "../../../services/serviceJobs";

interface Props {
    jobsList: JobItem[];
    setJobsList: React.Dispatch<React.SetStateAction<JobItem[]>>;
}

export default function DetailJobView({ jobsList, setJobsList }: Props) {
    const [currentJob, setCurrentJob] = useState<JobItem>();

    //   const [jobTitle, setJobTitle] = useState<string>("");
    //   const [jobDescription, setJobDescription] = useState<string>("");

    const { id } = useParams();
    const navigate = useNavigate();

    /* Requesting single job data from server via REST API */
    useEffect(() => {
        void (async () => {
            try {
                const result = await axios.get<JobItem>(
                    `http://127.0.0.1:3001/api/job/${id}`
                );

                if (
                    !result ||
                    typeof result !== "object" ||
                    !result.data ||
                    !("data" in result) ||
                    typeof result.data !== "object"
                )
                    throw new Error("error while retrieving job list from server");

                setCurrentJob(result.data);
            } catch (error) {
                if (error instanceof Error) {
                    throw new Error("unknown server error", error);
                }
            }
        })();
    }, []);

    const handleDelete = async (id: number) => {
        await serviceJobs.deleteJob(id);
        setJobsList((jobsList) => jobsList.filter((job) => job.id !== id));
        navigate("/");
        // try {
        //     const response: unknown = await axios.delete(
        //         `http://127.0.0.1:3001/api/jobs/${id}`
        //     );
        //
        //     /* Narrowing response from server and checking code 204 */
        //     if (
        //         !response ||
        //         typeof response !== "object" ||
        //         !("status" in response) ||
        //         response.status !== 204
        //     )
        //         throw new Error("error while deleting entity");
        //
        //     /* Updating list of jobs */
        //     setJobsList(jobsList.filter((job) => job.id !== id));
        //
        //     navigate("/");
        // } catch (error) {
        //     if (error instanceof Error) {
        //         throw new Error(
        //             "unknown server error occured while attemped to delete item from server",
        //             error
        //         );
        //     }
        // }
    };

    const handleSave = async (id: number) => {
        if (!currentJob) return;

        console.log(currentJob.job_title, currentJob.job_desc);

        const jobToPut: JobItem = {
            ...currentJob,
            job_title: currentJob.job_title,
            job_desc: currentJob.job_desc,
        };

        try {
            const response: unknown = await axios.put<JobItem>(
                `http://127.0.0.1:3001/api/job/${id}`,
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

            setJobsList(
                jobsList.map((job) => {
                    if (job.id === id) {
                        return {
                            ...job,
                            job_title: currentJob.job_title,
                            job_desc: currentJob.job_desc,
                        };
                    } else {
                        return { ...job };
                    }
                })
            );

            navigate("/");
        } catch (error) {
            if (error instanceof Error) {
                throw new Error(
                    "unknown server error occured while attemped to delete item from server",
                    error
                );
            }
        }
    };

    /* Waiting for data arrival */
    if (!currentJob) return null;

    return (
        <div className="mt-8 flex h-[85vh] w-4/5 flex-col rounded-lg border border-neutral bg-base-100 shadow-xl">
            <div className="flex flex-row justify-between rounded-t-md bg-neutral py-2">
                <div className="flex w-1/3 flex-row justify-start ">
                    <h2 className=" card card-title ml-4 text-xl font-light text-base-100">
                        Detail job view
                    </h2>
                </div>
                <div className="flex w-1/3 shrink flex-row justify-end align-baseline">
                    <button
                        onClick={() => handleDelete(Number(id))}
                        className="btn btn-sm my-auto mr-4 w-1/3"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => handleSave(Number(id))}
                        className="btn btn-sm my-auto mr-4  w-1/3"
                    >
                        Save
                    </button>
                    <button
                        onClick={() => navigate("/")}
                        className="btn btn-sm my-auto mr-4  w-1/3"
                    >
                        Cancel
                    </button>
                </div>
            </div>


            <div className="mx-8 mb-4 flex h-full flex-col gap-y-2">
                <label htmlFor="job_title_desc" className="label-text mt-6">
                    Job title
                </label>
                <textarea
                    id="job_title_desc"
                    name="job_title_desc"
                    className="textarea textarea-bordered textarea-md resize-none border-neutral text-lg"
                    defaultValue={`${currentJob.job_title}`}
                    onChange={(event) =>
                        setCurrentJob({ ...currentJob, job_title: event.target.value })
                    }
                />
                <div className="border-dotted border-black"></div>

                <label htmlFor="job_detail_desc" className="label-text">
                    Job description
                </label>
                <textarea
                    id="job_detail_desc"
                    name="job_detail_desc"
                    className="textarea border mb-4 h-full resize-none border-neutral"
                    defaultValue={`${currentJob.job_desc}`}
                    onChange={(event) =>
                        setCurrentJob({ ...currentJob, job_desc: event.target.value })
                    }
                />
            </div>
        </div>
    );
}
