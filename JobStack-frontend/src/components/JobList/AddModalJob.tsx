import React, { useState, SyntheticEvent, useContext } from "react";
import axios from "axios";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import AlertContext from "../Contexts/AlertContext";
import UserContext from "../Contexts/UserContext";

interface Props {
    modalAddJobForm: React.RefObject<HTMLDialogElement>;
}

const ModalAddJob = ({ modalAddJobForm }: Props) => {
    const queryClient = useQueryClient();

    const [newJobTitle, setNewJobTitle] = useState<string>("");
    const [newJobDesc, setNewJobDesc] = useState<string>("");
    const [newJobDate, setNewJobDate] = useState<string>(
        new Date().toISOString().split("T")[0]
    );

    /* Access to global context AlertContext */
    const { alerts, setAlerts } = useContext(AlertContext);

    /* Access to global context UserContext */
    const { user } = useContext(UserContext);

    const newJobsMutation = useMutation({
        mutationFn: () => {
            return axios.post(
                `/api/jobs/${user?.id}`,
                {
                    job_title: newJobTitle,
                    job_desc: newJobDesc,
                    // date_of_apply: new Date().toISOString(),
                    date_of_apply: newJobDate,
                    current_status_desc: "Applied",
                    active: true,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        },
        onSuccess(data) {
            /* Getting id of created job */
            /* Adding first status for new job */
            newStatusMutation.mutate(data.data.id);
        },
    });

    // /* Adding first status for new job */
    const newStatusMutation = useMutation({
        mutationFn: (job_id) => {
            return axios.post(
                `/api/status/${job_id}`,
                {
                    position: 0,
                    status: "Applied",
                    status_desc: "",
                    date: new Date().toISOString(),
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                    },
                }
            );
        },
        onSuccess: () => {
            queryClient.invalidateQueries();
            // queryClient.invalidateQueries({ queryKey: ["jobs", user?.id] });
            // queryClient.invalidateQueries({ queryKey: ["statuses"] });
            setAlerts(alerts.concat("New job was added successfully"));
        },
    });

    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        /* Adding new job */
        newJobsMutation.mutate();

        modalAddJobForm.current?.close();
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

                    <div className="flex justify-between">
                        <h3 className="text-lg font-bold">New job vacancy</h3>
                        {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
                        <label className="mr-5 flex">
                            <div className="label">
                                <span className="label-text">Event date</span>
                            </div>
                            <input
                                type="date"
                                name="status_date"
                                id="status_date"
                                className="input input-sm input-bordered rounded-md border-neutral"
                                value={newJobDate}
                                onChange={(event) =>
                                    setNewJobDate(event.target.value)
                                }
                            />
                        </label>
                    </div>
                    <div>
                        <div className="flex flex-col">
                            <label
                                htmlFor="job_title"
                                className="label-text mt-0 text-neutral"
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
                                    onChange={(event) =>
                                        setNewJobTitle(event.target.value)
                                    }
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
                                    onChange={(event) =>
                                        setNewJobDesc(event.target.value)
                                    }
                                />
                            </div>
                            <p className="label-text-alt">
                                Paste here all of a description
                            </p>
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
                            {/* <button
                                type="button"
                                onClick={handleSubmit}
                                className="btn btn-active btn-sm"
                            >
                                Save
                            </button> */}
                            <button
                                type="submit"
                                // onClick={() => {
                                //     modalAddJobForm.current?.close();
                                // }}
                                className="btn btn-active btn-sm"
                            >
                                Save
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </dialog>
    );
};

export default ModalAddJob;
