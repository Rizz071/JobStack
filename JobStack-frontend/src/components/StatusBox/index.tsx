import React, { useRef } from "react";
import StatusTimeLine from "./StatusTimeLine";
import { StatusObject } from "../../types";
import AddStatusModal from "./AddStatusModal";
// import { useQuery } from "@tanstack/react-query";
// import serviceStatuses from "../../../services/serviceStatuses";
// import LoadingProgress from "../LoadingProgress";

interface Props {
    job_id: number;
    statusList: StatusObject[];
}

const StatusBox = ({ job_id, statusList }: Props) => {
    const modalAddStatusForm = useRef<HTMLDialogElement>(null);

    const statusArray = statusList.filter((status) => status.job_id === job_id);

    return (
        <>
            <AddStatusModal
                modalAddStatusForm={modalAddStatusForm}
                job_id={job_id}
                statusArray={statusArray}
            />

            <div className="mx-8 mt-6 flex h-fit flex-col bg-base-100 shadow md:mx-0 md:mt-0">
                <div className="flex flex-row justify-between bg-base-100 pt-5">
                    <h2 className="my-auto mb-1 ml-6 text-lg font-light text-neutral">
                        Stage
                    </h2>
                    <button
                        onClick={() => modalAddStatusForm.current?.showModal()}
                        className="btn btn-outline btn-success btn-sm mr-6 rounded-none"
                    >
                        Add
                    </button>
                </div>
                <StatusTimeLine statusArray={statusArray} />
            </div>
        </>
    );
    // } else {
    //     return null;
    //     }
};
export default StatusBox;
