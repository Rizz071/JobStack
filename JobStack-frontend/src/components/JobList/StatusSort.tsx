import React from "react";
import { StatusFilter } from "../../types";

interface Props {
    statusFilter: StatusFilter;
    setStatusFilter: React.Dispatch<React.SetStateAction<StatusFilter>>;
}

const StatusSort = ({ statusFilter, setStatusFilter }: Props) => {
    return (
        <div className="flex flex-row bg-base-200">
            <div role="tablist" className="flex w-full justify-evenly tabs tabs-bordered tabs-sm">
                <a
                    role="tab"
                    className={`tab ${statusFilter === "all" ? "tab-active" : ""}`}
                    onClick={() => setStatusFilter("all")}>
                    All
                </a>
                <a
                    role="tab"
                    className={`tab ${statusFilter === "in_progress" ? "tab-active" : ""} `}
                    onClick={() => setStatusFilter("in_progress")}>
                    In progress
                </a>
                <a
                    role="tab"
                    className={`tab ${statusFilter === "rejected" ? "tab-active" : ""} `}
                    onClick={() => setStatusFilter("rejected")}>
                    Rejected
                </a>
                <a
                    role="tab"
                    className={`tab ${statusFilter === "offer" ? "tab-active" : ""} `}
                    onClick={() => setStatusFilter("offer")}>
                    Offer
                </a>
            </div>
        </div>
    );
};

export default StatusSort;