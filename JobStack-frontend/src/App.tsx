import React from "react";
import { MouseEventHandler, useCallback, useRef, useState } from "react";
import JobsList from "./components/JobList";
import NavBar from "./components/NavBar";
import { JobItem } from "./types";
import DetailJobView from "./components/DetailJobView";
import { Routes, Route } from "react-router-dom";
import StatusBox from "./components/StatusBox";
import Stats from "./components/Stats";
import { useQuery } from "@tanstack/react-query";
import serviceJobs from "../services/serviceJobs";
import LoadingProgress from "./components/LoadingProgress";
import Layout from "./components/Layout";


function App() {
    const [pagesTotalAmount, setPagesTotalAmount] = useState<number>(0);
    const [currentPage, setCurrentPage] = useState<number>(0);
    const [jobsPerPage, setJobsPerPage] = useState<number>(0);
    const [selectedJob, setSelectedJob] = useState<number | undefined>(undefined);

    const ref = useRef<HTMLDialogElement>(null);
    const handleShowAddJobForm = useCallback<
        MouseEventHandler<HTMLElement>
    >(() => {
        ref.current?.showModal();
    }, [ref]);

    interface StyleType {
        backgroundImage: string;
    }

    const Style: StyleType = {
        backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Cg fill-rule='evenodd'%3E%3Cg fill='gray' fill-opacity='0.4'%3E%3Cpath opacity='.5' d='M96 95h4v1h-4v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4h-9v4h-1v-4H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15v-9H0v-1h15V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h9V0h1v15h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9h4v1h-4v9zm-1 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm9-10v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-10 0v-9h-9v9h9zm-9-10h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9zm10 0h9v-9h-9v9z'/%3E%3Cpath d='M6 5V0H5v5H0v1h5v94h1V6h94V5H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E\")"
    };


    /* Requesting data from server via REST API */
    const result = useQuery({
        queryKey: ["jobs"],
        queryFn: () => serviceJobs.requestJobList()
    });
    console.log(JSON.parse(JSON.stringify(result)));

    if (result.isLoading) {
        return <LoadingProgress />;
    }

    if (result.isError) {
        return <div>Error occured while requesting data from server!</div>;
    }

    if (result.isSuccess) {
        const jobsList: JobItem[] = result.data;
        !selectedJob ? setSelectedJob(jobsList[0].id) : undefined;


        return (
            <Layout>
                <Routes>
                    <Route
                        path="/"
                        element={
                            <>
                                {/* <div id="main-field-without-margins" className="w-full h-full flex justify-center"> */}
                                <div id="main-content-field" className="flex flex-col justify-center">
                                    <div className="">
                                        <Stats />
                                    </div>

                                    <div className="flex flex-row gap-x-10">
                                        <JobsList
                                            jobsList={jobsList}
                                            handleShowAddJobForm={handleShowAddJobForm}
                                            pagesTotalAmount={pagesTotalAmount}
                                            setPagesTotalAmount={setPagesTotalAmount}
                                            currentPage={currentPage}
                                            setCurrentPage={setCurrentPage}
                                            jobsPerPage={jobsPerPage}
                                            setJobsPerPage={setJobsPerPage}
                                            setSelectedJob={setSelectedJob}
                                        />
                                        <div className="shrink-0">
                                            {selectedJob && <StatusBox job_id={selectedJob} />}
                                        </div>
                                    </div>
                                </div>
                                {/* </div> */}
                            </>
                        }
                    >
                        {/* <Route index element={<Home />} /> */}
                    </Route>
                    <Route
                        path="/detailview/:id"
                        element={
                            <div className="flex flex-row gap-x-6 justify-center w-full">
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



        return (
            <div style={Style} className="flex h-screen flex-col">
                <NavBar />
                <div className="container mx-auto flex w-3/4 flex-1 flex-row justify-between gap-x-6">
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <>
                                    <JobsList
                                        jobsList={jobsList}
                                        // setJobsList={setJobsList}
                                        handleShowAddJobForm={handleShowAddJobForm}
                                        pagesTotalAmount={pagesTotalAmount}
                                        setPagesTotalAmount={setPagesTotalAmount}
                                        currentPage={currentPage}
                                        setCurrentPage={setCurrentPage}
                                        jobsPerPage={jobsPerPage}
                                        setJobsPerPage={setJobsPerPage}
                                        setSelectedJob={setSelectedJob}
                                    />
                                    <div className="flex flex-col w-1/5">
                                        {/* {selectedJob && <StatusBox job_id={selectedJob} />} */}
                                    </div>
                                </>
                            }
                        >
                            {/* <Route index element={<Home />} /> */}
                        </Route>
                        <Route
                            path="/detailview/:id"
                            element={
                                <div className="flex flex-row gap-x-6 justify-center w-full">
                                    <DetailJobView />
                                </div>
                            }
                        />

                        {/* Using path="*"" means "match anything", so this route acts like a
          catch-all for URLs that we don't have explicit routes for. */}
                        <Route path="*" element={<p>404 page not found</p>} />
                    </Routes>
                </div>
            </div>
        );
    } else {
        return null;
    }
}

export default App;
