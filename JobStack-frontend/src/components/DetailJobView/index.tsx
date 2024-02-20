import React from "react";
import { useState } from "react";
import { JobItem } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import serviceJobs from "../../../services/serviceJobs";
import { useQueryClient, useMutation } from "@tanstack/react-query";


const DetailJobView = () => {
    const [jobTitle, setJobTitle] = useState<string>("");
    const [jobDescription, setJobDescription] = useState<string>("");

    const queryClient = useQueryClient();

    const { id } = useParams();
    const navigate = useNavigate();

    const jobsList: JobItem[] = queryClient.getQueryData(["jobs"]) || [];

    const currentJob: JobItem | undefined = jobsList.find(job => job.id === Number(id));


    const deleteMutation = useMutation({
        mutationFn: (id: number) => serviceJobs.deleteJob(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jobs"] });
        }
    });

    const saveMutation = useMutation({
        mutationFn: (jobToPut: JobItem) => serviceJobs.putJob(jobToPut),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jobs"] });
        }
    });

    const handleDelete = async () => {
        if (!currentJob) return null;

        deleteMutation.mutate(currentJob.id);
        navigate("/");
    };

    const handleSave = async () => {
        if (!currentJob) return;

        const jobToPut: JobItem = {
            ...currentJob,
            job_title: jobTitle,
            job_desc: jobDescription
        };

        saveMutation.mutate(jobToPut);

        navigate("/");
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
                        onClick={() => handleDelete()}
                        className="btn btn-sm my-auto mr-4 w-1/3"
                    >
                        Delete
                    </button>
                    <button
                        onClick={() => handleSave()}
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
                        setJobTitle(event.target.value)
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
                        setJobDescription(event.target.value)
                    }
                />
            </div>
        </div>
    );
};


export default DetailJobView;
