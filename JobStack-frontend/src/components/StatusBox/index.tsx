import React, { useEffect, useState, useRef } from "react";
import StatusTimeLine from "./StatusTimeLine";
import { StatusObject } from "../../types";
import axios from "axios";
import AddStatusModal from "./AddStatusModal";

interface Props {
    job_id: number | undefined;
}

const StatusBox = ({ job_id }: Props) => {
    const [statusArray, setStatusArray] = useState<StatusObject[]>([]);
    const modalAddStatusForm = useRef<HTMLDialogElement>(null);

    /* Requesting status data from backend */
    useEffect(() => {
        if (!job_id) return;

        (async function () {
            try {
                const response: unknown = await axios.get<StatusObject[]>(`/api/status/${job_id}`);

                /* Narrowing type Status Object*/
                if (!response
                    || typeof response !== "object"
                    || !("data" in response)
                    || !Array.isArray(response.data))
                    return new Error("error while retrieving job list from server");

                setStatusArray(response.data);
                console.log("Statuses received: ", response.data);

            } catch (error) {
                if (error instanceof Error) {
                    throw new Error("Error while requesting statuses from backend");
                }
                console.log(error);
            }
        }());
    }, [job_id]);

    /* Waiting for statusArray */
    if (!job_id) return (

        <div className="mt-8 flex h-fit w-1/5 flex-col rounded-lg border border-neutral bg-base-100 shadow-xl">
            <div className="flex flex-row justify-between rounded-t-md bg-neutral py-2">
                <h2 className="my-auto mb-1 ml-6 text-xl font-light text-neutral-content">
                    Status box
                </h2>
            </div>
            <div className="flex flex-row justify-center prose p-2">
                <span className="">Select job in list</span>
            </div>
        </div>
    );

    if (!statusArray) return <div></div>;

    return (
        <>
            <AddStatusModal
                modalAddStatusForm={modalAddStatusForm}
                job_id={job_id}
                statusArray={statusArray}
                setStatusArray={setStatusArray}
            />

            <div className="mt-8 flex h-fit w-1/5 flex-col rounded-lg border border-neutral bg-base-100 shadow-xl">
                <div className="flex flex-row justify-between rounded-t-md bg-neutral py-2">
                    <h2 className="my-auto mb-1 ml-6 text-xl font-light text-neutral-content">
                        Status box
                    </h2>
                    <button
                        onClick={() => modalAddStatusForm.current?.showModal()}
                        className="btn btn-sm  mr-6 rounded-md"
                    >
                        Add
                    </button>
                </div>
                <StatusTimeLine statusArray={statusArray} />
            </div>
        </>

    );
};

export default StatusBox;