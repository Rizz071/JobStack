import React, { useContext, useRef } from "react";
import { useState } from "react";
import { JobItem } from "../../types";
import { useNavigate, useParams } from "react-router-dom";
import serviceJobs from "../../../services/serviceJobs";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import ModalConfirmation from "../ModalConfirmation";
import AlertContext from "../Contexts/AlertContext";

const DetailJobView = () => {
    const [jobTitle, setJobTitle] = useState<string>();
    const [jobDescription, setJobDescription] = useState<string>();

    /* Confirmation Dialog's implementation */
    const modalConfirmation = useRef<HTMLDialogElement>(null);
    const [acceptFunc, setAcceptFunc] = useState<() => Promise<void>>(
        async () => {}
    );

    const queryClient = useQueryClient();

    const { id } = useParams();
    const navigate = useNavigate();

    const jobsList: JobItem[] = queryClient.getQueryData(["jobs"]) || [];

    const currentJob: JobItem | undefined = jobsList.find(
        (job) => job.id === Number(id)
    );

    const deleteMutation = useMutation({
        mutationFn: (id: number) => serviceJobs.deleteJob(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jobs"] });
            setAlerts(alerts.concat("Deleted successfully"));
        },
    });

    const saveMutation = useMutation({
        mutationFn: (jobToPut: JobItem) => serviceJobs.putJob(jobToPut),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jobs"] });
            setAlerts(alerts.concat("Saved successfully"));
        },
    });

    const handleDelete = async () => {
        if (!currentJob) return;

        deleteMutation.mutate(currentJob.id);
        navigate("/");
    };

    const handleSave = async () => {
        if (!currentJob) return;

        console.log(currentJob.job_title);

        const jobToPut: JobItem = {
            ...currentJob,
            job_title: jobTitle || "",
            job_desc: jobDescription || "",
        };

        saveMutation.mutate(jobToPut);
    };

    /* Access to global context AlertContext */
    const { alerts, setAlerts } = useContext(AlertContext);

    /* Waiting for data arrival */
    if (!currentJob) return null;

    if (!jobTitle) setJobTitle(currentJob.job_title);
    if (!jobDescription) setJobDescription(currentJob.job_desc);

    return (
        <>
            {/* Part of Confirmation Dialog's implementation */}
            <ModalConfirmation
                modalConfirmation={modalConfirmation}
                acceptFunc={acceptFunc}
            />
            <div className="mt-8 flex h-[85vh] w-4/5 flex-col rounded-md border border-neutral-content bg-base-100 shadow-lg">
                <div className="flex justify-between rounded-md bg-base-100 py-2">
                    <div className="flex w-1/3 justify-start text-lg">
                        <h2 className=" card card-title ml-4 text-xl text-neutral">
                            Job editing
                        </h2>
                    </div>
                    <div className="flex w-1/3 shrink justify-end align-baseline">
                        <button
                            onClick={() => {
                                setAcceptFunc(() => () => handleSave());
                                modalConfirmation.current?.showModal();
                            }}
                            className={` ${
                                jobTitle === currentJob.job_title &&
                                jobDescription === currentJob.job_desc
                                    ? "hidden"
                                    : ""
                            } btn btn-outline btn-success btn-sm  my-auto mr-4 w-1/3`}
                            // disabled={
                            //     jobTitle === currentJob.job_title &&
                            //     jobDescription === currentJob.job_desc
                            //         ? true
                            //         : false
                            // }
                        >
                            Save
                        </button>
                        <button
                            onClick={() => {
                                setAcceptFunc(() => () => handleDelete());
                                modalConfirmation.current?.showModal();
                            }}
                            className="btn btn-outline btn-error btn-sm my-auto mr-4 w-1/3"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => navigate("/")}
                            className="btn btn-active btn-sm my-auto mr-4 w-1/3"
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
                        className="textarea textarea-bordered textarea-md resize-none border-neutral-content text-lg"
                        value={jobTitle}
                        onChange={(event) => setJobTitle(event.target.value)}
                    />
                    <div className="border-dotted border-black"></div>

                    <label htmlFor="job_detail_desc" className="label-text">
                        Job description
                    </label>
                    <textarea
                        id="job_detail_desc"
                        name="job_detail_desc"
                        className="textarea mb-4 h-full resize-none border border-neutral-content"
                        value={jobDescription}
                        onChange={(event) =>
                            setJobDescription(event.target.value)
                        }
                    />
                </div>
            </div>
        </>
    );
};

export default DetailJobView;
