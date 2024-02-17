import React, { useState, SyntheticEvent } from "react";
import { StatusObject, NewStatusObject } from "../../types";
import axios from "axios";
import serviceJobs from "../../../services/serviceJobs";

interface Props {
    modalAddStatusForm: React.RefObject<HTMLDialogElement>;
    job_id: number;
    statusArray: StatusObject[];
    setStatusArray: React.Dispatch<React.SetStateAction<StatusObject[]>>;
}

const AddStatusModal = ({ modalAddStatusForm, job_id, statusArray, setStatusArray }: Props) => {
    const [statusName, setStatusName] = useState<string>("");
    const [statusDesc, setStatusDesc] = useState<string>("");
    const [statusDate, setStatusDate] = useState<string>(new Date().toISOString().split("T")[0]);



    const handleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();

        /* Adding new stage */
        void (async () => {
            const newStatusObject: NewStatusObject = {
                position: Math.max(...statusArray.map(status => Number(status.position))) + 1,
                status: statusName,
                status_desc: statusDesc,
                date: new Date(statusDate)
            };

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
                    || !serviceJobs.isStatusObject(response.data)

                ) {
                    throw Error("Error: server did not properly respond");
                }

                if (response.status === 201) {
                    setStatusName("");
                    setStatusDesc("");
                    setStatusDate(new Date().toISOString().split("T")[0]);

                    setStatusArray(statusArray.concat(response.data));
                } else {
                    throw Error("Error: unknown error occured on server while creating new stage status");
                }

            } catch (error) {
                if (error instanceof Error) {
                    console.log(error.message);
                }
            }
        })();
    };


    return (
        <dialog ref={modalAddStatusForm} id="modal_add_status" className="modal">
            <div className="modal-box w-1/3 max-w-none rounded-md">
                <form method="dialog" onSubmit={handleSubmit}>
                    {/* if there is a button in form, it will close the modal */}
                    <button
                        type="button"
                        onClick={() => modalAddStatusForm.current?.close()}
                        className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2"
                    >
                        ✕
                    </button>
                    <h3 className="text-lg font-bold">Adding a new job search stage</h3>
                    {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
                    <div>
                        <div className="flex flex-col">

                            <div className="mt-2">
                                <div className="flex flex-row gap-x-6">

                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Stage selection</span>
                                        </div>
                                        <select
                                            value={statusName}
                                            onChange={event => setStatusName(event.target.value)}
                                            className="select select-bordered w-full max-w-xs"
                                        >
                                            <option disabled></option>
                                            <option>Test task received</option>
                                            <option>Test task completed</option>
                                            <option>Interview scheduled</option>
                                            <option>Interview conducted</option>
                                            <option>Job denied</option>
                                            <option>Offer granted</option>
                                        </select>
                                    </label>


                                    <label className="form-control w-full">
                                        <div className="label">
                                            <span className="label-text">Event date</span>
                                        </div>
                                        <input
                                            type="date"
                                            name="status_date"
                                            id="status_date"
                                            className="input input-bordered w-full"
                                            value={statusDate}
                                            onChange={event => setStatusDate(event.target.value)}
                                        />
                                    </label>
                                </div>

                                <label className="form-control w-full">
                                    <div className="label">
                                        <span className="label-text">Comment</span>
                                    </div>
                                    <input
                                        type="text"
                                        name="status_comment"
                                        id="status_comment"
                                        className="input input-bordered w-full"
                                        value={statusDesc}
                                        onChange={(event) => setStatusDesc(event.target.value)}
                                    />
                                </label>
                            </div>
                        </div>

                        <div className="mt-4 flex justify-between ">
                            <button
                                type="button"
                                onClick={() => {
                                    // setNewJobTitle("");
                                    // setNewJobDesc("");
                                    modalAddStatusForm.current?.close();
                                }}
                                className="btn btn-active btn-sm mr-6"
                            >
                                Cancel
                            </button>
                            <button
                                type="submit"
                                onClick={() => {
                                    modalAddStatusForm.current?.close();
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

export default AddStatusModal;
