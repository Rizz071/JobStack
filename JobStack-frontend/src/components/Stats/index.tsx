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
    const totalDaysAmount = Math.floor(
        (lastDate.getTime() - firstDate.getTime()) / (24 * 60 * 60 * 1000)
    );

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

    return (
        <div className="stats mx-8 mt-4 grid-flow-row-dense grid-cols-3 rounded-none shadow sm:grid-cols-6 md:mx-0 md:mt-0 md:w-full md:gap-0">
            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M20.25 14.15v4.25c0 1.094-.787 2.036-1.872 2.18-2.087.277-4.216.42-6.378.42s-4.291-.143-6.378-.42c-1.085-.144-1.872-1.086-1.872-2.18v-4.25m16.5 0a2.18 2.18 0 0 0 .75-1.661V8.706c0-1.081-.768-2.015-1.837-2.175a48.114 48.114 0 0 0-3.413-.387m4.5 8.006c-.194.165-.42.295-.673.38A23.978 23.978 0 0 1 12 15.75c-2.648 0-5.195-.429-7.577-1.22a2.016 2.016 0 0 1-.673-.38m0 0A2.18 2.18 0 0 1 3 12.489V8.706c0-1.081.768-2.015 1.837-2.175a48.111 48.111 0 0 1 3.413-.387m7.5 0V5.25A2.25 2.25 0 0 0 13.5 3h-3a2.25 2.25 0 0 0-2.25 2.25v.894m7.5 0a48.667 48.667 0 0 0-7.5 0M12 12.75h.008v.008H12v-.008Z"
                        />
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
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0 0 20.25 18V6A2.25 2.25 0 0 0 18 3.75H6A2.25 2.25 0 0 0 3.75 6v12A2.25 2.25 0 0 0 6 20.25Z"
                            />
                        </svg>
                    </div>
                    <div className="stat-title text-xs md:text-sm">
                        Avg per day
                    </div>
                    <div className="stat-value text-3xl font-semibold">
                        {avgJobs_perDay}
                    </div>
                    <div className="stat-desc">
                        Total {totalDaysAmount} days
                    </div>
                </div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M12 8.25v-1.5m0 1.5c-1.355 0-2.697.056-4.024.166C6.845 8.51 6 9.473 6 10.608v2.513m6-4.871c1.355 0 2.697.056 4.024.166C17.155 8.51 18 9.473 18 10.608v2.513M15 8.25v-1.5m-6 1.5v-1.5m12 9.75-1.5.75a3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0 3.354 3.354 0 0 0-3 0 3.354 3.354 0 0 1-3 0L3 16.5m15-3.379a48.474 48.474 0 0 0-6-.371c-2.032 0-4.034.126-6 .371m12 0c.39.049.777.102 1.163.16 1.07.16 1.837 1.094 1.837 2.175v5.169c0 .621-.504 1.125-1.125 1.125H4.125A1.125 1.125 0 0 1 3 20.625v-5.17c0-1.08.768-2.014 1.837-2.174A47.78 47.78 0 0 1 6 13.12M12.265 3.11a.375.375 0 1 1-.53 0L12 2.845l.265.265Zm-3 0a.375.375 0 1 1-.53 0L9 2.845l.265.265Zm6 0a.375.375 0 1 1-.53 0L15 2.845l.265.265Z"
                        />
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
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className="h-6 w-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                            />
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
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M16.5 18.75h-9m9 0a3 3 0 0 1 3 3h-15a3 3 0 0 1 3-3m9 0v-3.375c0-.621-.503-1.125-1.125-1.125h-.871M7.5 18.75v-3.375c0-.621.504-1.125 1.125-1.125h.872m5.007 0H9.497m5.007 0a7.454 7.454 0 0 1-.982-3.172M9.497 14.25a7.454 7.454 0 0 0 .981-3.172M5.25 4.236c-.982.143-1.954.317-2.916.52A6.003 6.003 0 0 0 7.73 9.728M5.25 4.236V4.5c0 2.108.966 3.99 2.48 5.228M5.25 4.236V2.721C7.456 2.41 9.71 2.25 12 2.25c2.291 0 4.545.16 6.75.47v1.516M7.73 9.728a6.726 6.726 0 0 0 2.748 1.35m8.272-6.842V4.5c0 2.108-.966 3.99-2.48 5.228m2.48-5.492a46.32 46.32 0 0 1 2.916.52 6.003 6.003 0 0 1-5.395 4.972m0 0a6.726 6.726 0 0 1-2.749 1.35m0 0a6.772 6.772 0 0 1-3.044 0"
                        />
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
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="h-6 w-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="m9.75 9.75 4.5 4.5m0-4.5-4.5 4.5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                        />
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
