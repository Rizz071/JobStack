import React, { useRef } from "react";
import StatusTimeLine from "./StatusTimeLine";
import { StatusObject } from "../../types";
import AddStatusModal from "./AddStatusModal";
import { useQuery } from "@tanstack/react-query";
import serviceStatuses from "../../../services/serviceStatuses";

interface Props {
    job_id: number;
}

const StatusBox = ({ job_id }: Props) => {
    const modalAddStatusForm = useRef<HTMLDialogElement>(null);

    /* Requesting data from server via REST API */
    const result = useQuery({
        queryKey: ["statuses", job_id],
        queryFn: () => serviceStatuses.requestJobStatusList(job_id)
    });
    console.log(JSON.parse(JSON.stringify(result)));

    /* Waiting for statusArray */
    if (result.isLoading) {
        return (
            <div className="mt-8 flex h-fit w-full flex-col rounded-lg border border-neutral bg-base-100 shadow-xl">
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
    }

    if (result.isError) {
        return <div>Error occured while requesting data from server!</div>;
    }

    if (result.data instanceof Error) return <div>Error occured while requesting data from server!</div>;

    if (result.isSuccess) {
        const statusArray: StatusObject[] = result.data;

        return (
            <>
                <AddStatusModal
                    modalAddStatusForm={modalAddStatusForm}
                    job_id={job_id}
                    statusArray={statusArray}
                />

                <div className="mt-8 flex h-fit flex-col bg-base-100 shadow-xl">
                    <div className="flex flex-row justify-between bg-primary py-2">
                        <h2 className="my-auto mb-1 ml-6 text-xl font-light text-neutral-content">
                            Status box
                        </h2>
                        <button
                            onClick={() => modalAddStatusForm.current?.showModal()}
                            className="btn btn-sm mr-6 rounded-md"
                        >
                            Add
                        </button>
                    </div>
                    <StatusTimeLine statusArray={statusArray} />
                </div>
            </>

        );
    } else {
        return null;
    }
}
    ;

export default StatusBox;