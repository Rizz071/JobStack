import React, { useContext } from "react";
import { JobItem, StatusObject } from "../../types";
import { useQueryClient } from "@tanstack/react-query";
import UserContext from "../Contexts/UserContext";

const Stats = () => {
    const queryClient = useQueryClient();

    /* Access to global context UserContext */
    const { user } = useContext(UserContext);

    const jobsList: JobItem[] =
        queryClient.getQueryData(["jobs", user?.id]) || [];
    const statusList: StatusObject[] =
        queryClient.getQueryData(["statuses", jobsList]) || [];

    if (jobsList.length === 0 || statusList.length === 0)
        return <p>Nothing yet...</p>;

    const compareDate = (a: JobItem, b: JobItem) => {
        const dateA = Date.parse(a.date_of_apply);
        const dateB = Date.parse(b.date_of_apply);

        if (dateA < dateB) {
            return -1;
        }
        if (dateA > dateB) {
            return 1;
        }
        return 0;
    };

    const sortedJobsList_byDate = jobsList.sort(compareDate);
    const totalJobsAmount = jobsList.length;
    const firstDate = new Date(sortedJobsList_byDate[0].date_of_apply);
    const lastDate = new Date(sortedJobsList_byDate.slice(-1)[0].date_of_apply);
    const totalDaysAmount = lastDate.getDate() - firstDate.getDate();

    const inProcessAmount = jobsList.filter((jobItem) => {
        if (
            statusList
                .filter((status) => status.job_id === jobItem.id)
                .every(
                    (status) =>
                        status.status.toLowerCase() !== "rejected" &&
                        status.status.toLowerCase() !== "offer"
                )
        )
            return jobItem;
    }).length;

    const rejectedAmount = jobsList.filter((jobItem) => {
        if (
            statusList
                .filter((status) => status.job_id === jobItem.id)
                .find((statusObj) => {
                    if (statusObj.status.toLowerCase() === "rejected")
                        return true;
                })
        )
            return jobItem;
    }).length;

    const offeredAmount = jobsList.filter((jobItem) => {
        if (
            statusList
                .filter((status) => status.job_id === jobItem.id)
                .find((statusObj) => {
                    if (statusObj.status.toLowerCase() === "offer") return true;
                })
        )
            return jobItem;
    }).length;

    let avgJobs_perDay: number;
    if (totalDaysAmount !== 0) {
        avgJobs_perDay = Number((totalJobsAmount / totalDaysAmount).toFixed(1));
    } else {
        avgJobs_perDay = totalJobsAmount;
    }

    //TODO compare jobs amount in this month to last month

    return (
        <div className="stats mx-8 mt-4 grid-flow-row-dense grid-cols-3 rounded-none shadow sm:grid-cols-6 md:mx-0 md:mt-0 md:w-full md:gap-0">
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="hidden h-8 w-8 stroke-current md:inline-block"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                        ></path>
                    </svg>
                </div>
                <div className="stat-title text-xs md:text-sm">
                    Total applied
                </div>
                <div className="stat-value text-3xl font-semibold">
                    {totalJobsAmount}
                </div>
                <div className="stat-desc">
                    {firstDate.toLocaleString("default", {
                        month: "short",
                        day: "numeric",
                    })}{" "}
                    -{" "}
                    {lastDate.toLocaleString("default", {
                        month: "short",
                        day: "numeric",
                    })}
                </div>
            </div>

            <div className="border">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="hidden h-8 w-8 stroke-current md:inline-block"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                            ></path>
                        </svg>
                    </div>
                    <div className="stat-title text-xs md:text-sm">
                        Avg per day
                    </div>
                    <div className="stat-value text-3xl font-semibold">
                        {avgJobs_perDay}
                    </div>
                    <div className="stat-desc">↘︎ 90 (14%)</div>
                </div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="hidden h-8 w-8 stroke-current md:inline-block"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        ></path>
                    </svg>
                </div>
                <div className="stat-title text-xs md:text-sm">
                    Success rate
                </div>
                <div className="stat-value text-3xl font-semibold">
                    {(offeredAmount / totalJobsAmount).toFixed(1)} %
                </div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>

            <div className="border">
                <div className="stat">
                    <div className="stat-figure text-secondary">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            className="hidden h-8 w-8 stroke-current md:inline-block"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"
                            ></path>
                        </svg>
                    </div>
                    <div className="stat-title text-xs md:text-sm">
                        In process
                    </div>
                    <div className="stat-value text-3xl font-semibold">
                        {inProcessAmount}
                    </div>
                    <div className="stat-desc">↗︎ 400 (22%)</div>
                </div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="hidden h-8 w-8 stroke-current md:inline-block"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        ></path>
                    </svg>
                </div>
                <div className="stat-title text-xs md:text-sm">Offers</div>
                <div className="stat-value text-3xl font-semibold">
                    {offeredAmount}
                </div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        className="hidden h-8 w-8 stroke-current md:inline-block"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"
                        ></path>
                    </svg>
                </div>
                <div className="stat-title text-xs md:text-sm">Rejected</div>
                <div className="stat-value text-3xl font-semibold">
                    {rejectedAmount}
                </div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>
        </div>
    );
};

export default Stats;
