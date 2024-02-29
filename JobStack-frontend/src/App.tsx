import React from "react";
import { MouseEventHandler, useCallback, useRef, useState } from "react";
import JobsList from "./components/JobList";
import { JobItem, StatusFilter, StatusObject } from "./types";
import DetailJobView from "./components/DetailJobView";
import { Routes, Route } from "react-router-dom";
import StatusBox from "./components/StatusBox";
import Stats from "./components/Stats";
import { useQuery } from "@tanstack/react-query";
import serviceJobs from "../services/serviceJobs";
import LoadingProgress from "./components/LoadingProgress";
import Layout from "./components/Layout";
import serviceStatuses from "../services/serviceStatuses";

function App() {
    const [pagesTotalAmount, setPagesTotalAmount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [jobsPerPage, setJobsPerPage] = useState<number>(0);
    const [selectedJob, setSelectedJob] = useState<number | undefined>(
        undefined
    );
    const [statusFilter, setStatusFilter] = useState<StatusFilter>("all");
    // const [statusList, setStatusList] = useState<StatusObject[]>([]);
    const [headerHeight, setHeaderHeight] = useState<number>(0);

    const headerRef = useRef<HTMLDivElement>(null);
    const ref = useRef<HTMLDialogElement>(null);
    const handleShowAddJobForm = useCallback<
        MouseEventHandler<HTMLElement>
    >(() => {
        ref.current?.showModal();
    }, [ref]);

    // interface StyleType {
    //     backgroundImage: string;
    // }

    // const Style: StyleType = {
    //     backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='gray' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
    // };

    /* Requesting jobs data from server via REST API */
    const result_jobsList = useQuery({
        queryKey: ["jobs"],
        queryFn: serviceJobs.requestJobList,
    });
    console.log(
        "jobsList fetching",
        JSON.parse(JSON.stringify(result_jobsList))
    );

    /* Requesting jobs statuses data from server via REST API,
     * but first waiting for result_jobsList is loaded successfully */
    const result_jobsStatuses = useQuery({
        queryKey: ["statuses"],
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

    if (result_jobsList.isSuccess && result_jobsStatuses.isSuccess) {
        const jobsList: JobItem[] = result_jobsList.data;
        !selectedJob ? setSelectedJob(jobsList.slice(-1)[0].id) : undefined;

        // TODO Unsafe!!!
        const statusList: StatusObject[] =
            result_jobsStatuses.data as StatusObject[];

        return (
            <Layout>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                <div
                                    id="main-content-field"
                                    className="flex flex-col justify-center"
                                >
                                    <div ref={headerRef} className="">
                                        <Stats />
                                    </div>

                                    <div className="mt-8 flex flex-col justify-between md:flex-row md:gap-x-10">
                                        <JobsList
                                            jobsList={jobsList}
                                            statusList={statusList}
                                            handleShowAddJobForm={
                                                handleShowAddJobForm
                                            }
                                            pagesTotalAmount={pagesTotalAmount}
                                            setPagesTotalAmount={
                                                setPagesTotalAmount
                                            }
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

                                        {/* <div className="flex flex-col gap-y-[15px] mt-[38px]"> */}

                                        <div className="shrink-0">
                                            {selectedJob && (
                                                <StatusBox
                                                    job_id={selectedJob}
                                                    statusList={statusList}
                                                />
                                            )}
                                        </div>
                                        {/* </div> */}
                                    </div>
                                </div>
                            </>
                        }
                    >
                        {/* <Route index element={<Home />} /> */}
                    </Route>
                    <Route
                        path="/detailview/:id"
                        element={
                            <div className="flex w-full flex-row justify-center gap-x-6">
                                <DetailJobView />
                            </div>
                        }
                    />

                    {/* Using path="*"" means "match anything", so this route acts like a
          catch-all for URLs that we don't have explicit routes for. */}
                    <Route path="*" element={<p>404 page not found</p>} />
                </Routes>
            </Layout>
        );
    } else {
        return null;
    }
}

export default App;
