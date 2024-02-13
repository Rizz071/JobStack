import React, { useState, SyntheticEvent } from "react";
import { JobItem } from "../../types";
import axios from "axios";

interface Props {
    modalAddJobForm: React.RefObject<HTMLDialogElement>;
    jobsList: JobItem[];
    setJobsList: React.Dispatch<React.SetStateAction<JobItem[]>>;
}

const ModalAddJob = ({ modalAddJobForm, jobsList, setJobsList }: Props) => {
    const [newJobTitle, setNewJobTitle] = useState<string>("");
    const [newJobDesc, setNewJobDesc] = useState<string>("");

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        /* Adding new job */
        void (async () => {
            try {
                const response = await axios.post(
                    "http://127.0.0.1:3001/api/jobs/1",
                    {
                        job_title: newJobTitle,
                        job_desc: newJobDesc,
                        date_of_apply: new Date().toISOString(),
                        current_status_desc: "Just applyed",
                        active: true,
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );

                /* Getting id of created job */
                const job_id: number = response.data.id;

                /* Adding first status for new job */
                await axios.post(
                    `http://127.0.0.1:3001/api/status/${job_id}`,
                    {
                        position: 0,
                        status: "Just applied",
                        status_desc: "",
                        date: new Date().toISOString()
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                        },
                    }
                );
                setJobsList(jobsList.concat(response.data));
                setNewJobTitle("");
                setNewJobDesc("");



                setJobsList(jobsList.concat(response.data));







                setNewJobTitle("");
                setNewJobDesc("");
            } catch (error) {
                if (error instanceof Error) {
                    console.log(error);
                }
            }
        })();



    };

    return (
        <dialog ref={modalAddJobForm} id="modal_add_job" className="modal">
            <div className="modal-box w-1/3 max-w-none rounded-md">
                <form method="dialog" onSubmit={handleSubmit}>
                    {/* if there is a button in form, it will close the modal */}
                    <button
                        type="button"
                        onClick={() => modalAddJobForm.current?.close()}
                        className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                    >
                        ✕
                    </button>
                    <h3 className="text-lg font-bold">New job vacancy</h3>
                    {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
                    <div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="job_title"
                                className="label-text mt-6 text-neutral"
                            >
                                Job header
                            </label>
                            <div className="mt-2">
                                <input
                                    type="text"
                                    name="job_title"
                                    id="job_title"
                                    className="input input-sm input-bordered w-full resize-none rounded-md border-neutral"
                                    value={newJobTitle}
                                    onChange={(event) => setNewJobTitle(event.target.value)}
                                />
                            </div>

                            <label
                                htmlFor="job_desc"
                                className="label-text mt-6 text-neutral"
                            >
                                Long job description
                            </label>
                            <div className="mt-2">
                                <textarea
                                    id="job_desc"
                                    name="job_desc"
                                    rows={6}
                                    className="textarea textarea-bordered w-full resize-none rounded-md border-neutral"
                                    value={newJobDesc}
                                    onChange={(event) => setNewJobDesc(event.target.value)}
                                />
                            </div>
                            <p className="label-text-alt">Paste here all of a description</p>
                        </div>

                        <div className="mt-4 flex justify-between ">
                            <button
                                type="button"
                                onClick={() => {
                                    setNewJobTitle("");
                                    setNewJobDesc("");
                                    modalAddJobForm.current?.close();
                                }}
                                className="btn btn-active btn-sm mr-6"
                            >
                                Cancel
                            </button>
                            <button
                                type="button"
                                onClick={handleSubmit}
                                className="btn btn-active btn-sm"
                            >
                                Save
                            </button>
                            <button
                                type="submit"
                                onClick={() => {
                                    modalAddJobForm.current?.close();
                                }}
                                className="btn btn-active btn-sm"
                            >
                                Save and close
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default ModalAddJob;