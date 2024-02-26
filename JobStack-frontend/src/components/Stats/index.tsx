import React from "react";
import { JobItem, StatusObject } from "../../types";
import { useQueryClient } from "@tanstack/react-query";

const Stats = () => {

    const queryClient = useQueryClient();

    const jobsList: JobItem[] = queryClient.getQueryData(["jobs"]) || [];
    const statusList: StatusObject[] = queryClient.getQueryData(["statuses"]) || [];

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

    const inProcessAmount = jobsList.filter(jobItem => {
        if (statusList
            .filter(status => status.job_id === jobItem.id)
            .every(status => status.status.toLowerCase() !== "rejected" && status.status.toLowerCase() !== "offer"))
            return jobItem;
    }).length;

    const rejectedAmount = jobsList.filter(jobItem => {
        if (statusList
            .filter(status => status.job_id === jobItem.id)
            .find(statusObj => {
                if (statusObj.status.toLowerCase() === "rejected") return true;
            }))
            return jobItem;
    }).length;

    const offeredAmount = jobsList.filter(jobItem => {
        if (statusList
            .filter(status => status.job_id === jobItem.id)
            .find(statusObj => {
                if (statusObj.status.toLowerCase() === "offer") return true;
            }))
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
        <div className="stats shadow rounded-none w-full">

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                </div>
                <div className="stat-title">Total applied</div>
                <div className="stat-value">{totalJobsAmount}</div>
                <div className="stat-desc">{firstDate.toLocaleString("default", { month: "short", day: "numeric" })} - {lastDate.toLocaleString("default", { month: "short", day: "numeric" })}</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                </div>
                <div className="stat-title">Average per day</div>
                <div className="stat-value">{avgJobs_perDay}</div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4"></path></svg>
                </div>
                <div className="stat-title">In process</div>
                <div className="stat-value">{inProcessAmount}</div>
                <div className="stat-desc">↗︎ 400 (22%)</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                </div>
                <div className="stat-title">Offers</div>
                <div className="stat-value">{offeredAmount}</div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>

            <div className="stat">
                <div className="stat-figure text-secondary">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="inline-block w-8 h-8 stroke-current"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4"></path></svg>
                </div>
                <div className="stat-title">Rejected</div>
                <div className="stat-value">{rejectedAmount}</div>
                <div className="stat-desc">↘︎ 90 (14%)</div>
            </div>



        </div>
    );
};

export default Stats;
