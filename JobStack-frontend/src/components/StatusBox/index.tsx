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


    /* Requesting data from server via REST API */
    // const result = useQuery({
    //     queryKey: ["statuses", job_id],
    //     queryFn: () => serviceStatuses.requestJobStatusList(job_id)
    // });
    // console.log(JSON.parse(JSON.stringify(result)));

    /* Waiting for statusArray */
    // if (result.isLoading) {
    //     return (
    //         <div className="flex h-fit flex-col bg-base-100 shadow">
    //             <div className="flex flex-row justify-between bg-base-100 pt-5">
    //                 <h2 className="my-auto mb-1 ml-6 text-lg font-light text-neutral">
    //                     Stage
    //                 </h2>
    //             </div>
    //             <LoadingProgress />
    //         </div>
    //     );
    // }

    // if (result.isError) {
    //     return <div>Error occured while requesting data from server!</div>;
    // }

    // if (result.data instanceof Error) return <div>Error occured while requesting data from server!</div>;

    // if (result.isSuccess) {
    //     const statusArray: StatusObject[] = result.data;

    const statusArray = statusList.filter(status => status.job_id === job_id);

    return (
        <>
            <AddStatusModal
                modalAddStatusForm={modalAddStatusForm}
                job_id={job_id}
                statusArray={statusArray}
            />

            <div className="flex h-fit flex-col bg-base-100 shadow">
                <div className="flex flex-row justify-between bg-base-100 pt-5">
                    <h2 className="my-auto mb-1 ml-6 text-lg font-light text-neutral">
                        Stage
                    </h2>
                    <button
                        onClick={() => modalAddStatusForm.current?.showModal()}
                        className="btn btn-sm btn-success btn-outline mr-6 rounded-none"
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
}
    ;

export default StatusBox;