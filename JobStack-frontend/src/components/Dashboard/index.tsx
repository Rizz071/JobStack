import React, { useContext } from "react";
import Stats from "../Stats";
import JobsList from "../JobList";
import StatusBox from "../StatusBox";
import Alert from "../Alert";
import LoadingProgress from "../LoadingProgress";
import { MouseEventHandler, useCallback, useRef, useState } from "react";
import { JobItem, StatusFilter, StatusObject } from "../../types";
import { useQuery } from "@tanstack/react-query";
import serviceJobs from "../../../services/serviceJobs";
import serviceStatuses from "../../../services/serviceStatuses";
import AlertContext from "../Contexts/AlertContext";
import { Navigate } from "react-router-dom";
import UserContext from "../Contexts/UserContext";

const Dashboard = () => {
    const [pagesTotalAmount, setPagesTotalAmount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [jobsPerPage, setJobsPerPage] = useState<number>(0);
    const [selectedJob, setSelectedJob] = useState<number | undefined>(
        undefined
    );
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    const [headerHeight, setHeaderHeight] = useState<number>(0);

    /* Access to global context AlertContext */
    const { alerts } = useContext(AlertContext);

    /* Access to global context UserContext */
    const { user } = useContext(UserContext);

    const headerRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLDialogElement>(null);
    const handleShowAddJobForm = useCallback<
        MouseEventHandler<HTMLElement>
    >(() => {
        ref.current?.showModal();
    }, [ref]);

    const user_id = user?.id;

    /* Requesting jobs data from server via REST API */
    const result_jobsList = useQuery({
        queryKey: ["jobs", user_id],
        queryFn: () => serviceJobs.requestJobList(user_id),
        enabled: !!user_id,
    });
    console.log(
        "jobsList fetching",
        JSON.parse(JSON.stringify(result_jobsList))
    );

    /* Requesting jobs statuses data from server via REST API,
     * but first waiting for result_jobsList is loaded successfully */
    const result_jobsStatuses = useQuery({
        queryKey: ["statuses", result_jobsList.data],
        queryFn: () =>
            serviceStatuses.requestMultipleJobStatusList(
                result_jobsList.data?.map((job) => job.id) || []
            ),
        enabled: !!Array.isArray(result_jobsList.data),
    });
    console.log(
        "statuses fetching",
        JSON.parse(JSON.stringify(result_jobsStatuses))
    );

    if (result_jobsList.isLoading || result_jobsStatuses.isLoading) {
        return <LoadingProgress />;
    }

    if (result_jobsList.isError || result_jobsStatuses.isError) {
        return <div>Error occured while requesting jobs data from server!</div>;
    }

    // We can assume by this point that `isSuccess === true`

    if (
        result_jobsList.isSuccess &&
        result_jobsStatuses.isSuccess &&
        !result_jobsStatuses.isError
    ) {
        const jobsList: JobItem[] = result_jobsList.data;

        /* If we have not any jobs in list - don't select any jobs */
        if (jobsList.length !== 0) {
            !selectedJob ? setSelectedJob(jobsList[0].id) : undefined;
        }

        const statusList: StatusObject[] = result_jobsStatuses.data;

        if (!user) return <Navigate to="/index" />;

        return (
            <div
                id="main-content-field"
                className="flex flex-col justify-center"
            >
                <div ref={headerRef} className="flex w-full justify-center">
                    <Stats />
                </div>

                <div className="mt-8 flex flex-col justify-between md:flex-row md:gap-x-10">
                    <JobsList
                        jobsList={jobsList}
                        statusList={statusList}
                        handleShowAddJobForm={handleShowAddJobForm}
                        pagesTotalAmount={pagesTotalAmount}
                        setPagesTotalAmount={setPagesTotalAmount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                        jobsPerPage={jobsPerPage}
                        setJobsPerPage={setJobsPerPage}
                        selectedJob={selectedJob}
                        setSelectedJob={setSelectedJob}
                        statusFilter={statusFilter}
                        setStatusFilter={setStatusFilter}
                        headerHeight={headerHeight}
                        setHeaderHeight={setHeaderHeight}
                        headerRef={headerRef}
                    />

                    <div className="flex flex-col gap-y-8">
                        <div className="shrink-0">
                            {selectedJob && (
                                <StatusBox
                                    job_id={selectedJob}
                                    statusList={statusList}
                                />
                            )}
                        </div>

                        <div className="mt-auto align-bottom">
                            {alerts &&
                                alerts.map((alert, index) => (
                                    <Alert key={index} message={alert} />
                                ))}
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return <Navigate to="/index" />;
};

export default Dashboard;
