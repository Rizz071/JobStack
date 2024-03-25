/* eslint-disable indent */
import React, { useContext } from "react";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { JobItem, StatusFilter, StatusObject } from "../../types";
import thrashIcon from "../../assets/icons/thrash.svg";
import editIcon from "../../assets/icons/edit.svg";
import SearchField from "./SearchField";
import PaginationBox from "./PaginationBox";
import ModalAddJob from "./AddModalJob";
import { useNavigate } from "react-router-dom";
import serviceJobs from "../../../services/serviceJobs";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import StatusSort from "./StatusSort";
import ModalConfirmation from "../ModalConfirmation";
import AlertContext from "../Contexts/AlertContext";

interface Props {
    jobsList: JobItem[];
    handleShowAddJobForm: MouseEventHandler<HTMLElement>;
    statusList: StatusObject[];
    pagesTotalAmount: number;
    setPagesTotalAmount: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    jobsPerPage: number;
    setJobsPerPage: React.Dispatch<React.SetStateAction<number>>;
    setSelectedJob: React.Dispatch<React.SetStateAction<number | undefined>>;
    selectedJob: number | undefined;
    statusFilter: StatusFilter;
    setStatusFilter: React.Dispatch<React.SetStateAction<StatusFilter>>;
    headerHeight: number;
    setHeaderHeight: React.Dispatch<React.SetStateAction<number>>;
    headerRef: React.RefObject<HTMLDivElement>;
}

interface CheckboxSelect {
    id: number;
    state: boolean;
}

export default function JobsList({
    jobsList,
    statusList,
    pagesTotalAmount,
    setPagesTotalAmount,
    currentPage,
    setCurrentPage,
    jobsPerPage,
    setJobsPerPage,
    selectedJob,
    setSelectedJob,
    statusFilter,
    setStatusFilter,
    headerRef,
    headerHeight,
    setHeaderHeight,
}: Props) {
    const modalAddJobForm = useRef<HTMLDialogElement>(null);
    const [filteredJobList, setFilteredJobList] = useState<JobItem[]>([]);
    const [filterString, setFilterString] = useState<string>("");
    const [checkAll, setCheckAll] = useState<boolean>(false);

    const navigate = useNavigate();

    /* Access to global context UserContext */
    // const { user } = useContext(UserContext);

    /* Part of Confirmation Dialog's implementation */
    const modalConfirmation = useRef<HTMLDialogElement>(null);
    const [acceptFunc, setAcceptFunc] = useState<() => Promise<void>>(
        async () => {}
    );

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: number) => serviceJobs.deleteJob(id),
        onSuccess: (data, variables) => {
            queryClient.invalidateQueries();

            const id = variables;
            /* If we have not any jobs in list - don't select any jobs */
            if (jobsList.length !== 0) {
                if (selectedJob === id) setSelectedJob(jobsList[0].id);
            }

            setAlerts(alerts.concat("Deleted successfully"));
        },
    });

    /* Access to global context AlertContext */
    const { alerts, setAlerts } = useContext(AlertContext);

    const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    useEffect(() => {
        console.log("useEffect => addEventListener resize");
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    useEffect(() => {
        if (headerRef.current)
            setHeaderHeight(
                headerRef.current.clientHeight +
                    headerRef.current.getBoundingClientRect().top
            );
    }, [headerRef, setHeaderHeight, headerHeight, width]); //empty dependency array so it only runs once at render

    const [checkedState, setCheckedState] = useState<CheckboxSelect[]>([]);

    useEffect(() => {
        console.log("useEffect => setFilteredJobList");
        if (jobsList.length === 0) {
            console.log("...jobsList.length === 0 exiting");
            return;
        }

        setFilteredJobList(
            (() => jobsList)().filter((jobItem: JobItem) => {
                switch (statusFilter) {
                    case "all":
                        return jobItem;
                    case "in_progress":
                        if (
                            statusList
                                .filter(
                                    (status) => status.job_id === jobItem.id
                                )
                                .every(
                                    (status) =>
                                        status.status.toLowerCase() !==
                                            "rejected" &&
                                        status.status.toLowerCase() !== "offer"
                                )
                        )
                            return jobItem;
                        break;
                    case "rejected":
                        if (
                            statusList
                                .filter(
                                    (status) => status.job_id === jobItem.id
                                )
                                .find((statusObj) => {
                                    if (
                                        statusObj.status.toLowerCase() ===
                                        "rejected"
                                    )
                                        return true;
                                })
                        )
                            return jobItem;
                        break;
                    case "offer":
                        if (
                            statusList
                                .filter(
                                    (status) => status.job_id === jobItem.id
                                )
                                .find((statusObj) => {
                                    if (
                                        statusObj.status.toLowerCase() ===
                                        "offer"
                                    )
                                        return true;
                                })
                        )
                            return jobItem;
                        break;
                }
            })
        );

        if (filterString) {
            console.log("filterString=true");
            setFilteredJobList(
                (() => jobsList)().filter(
                    (jobItem: JobItem) =>
                        jobItem.job_title
                            .toLowerCase()
                            .includes(filterString.toLowerCase()) ||
                        jobItem.job_desc
                            .toLowerCase()
                            .includes(filterString.toLowerCase())
                )
            );
        }
        // } else {
        //     setFilteredJobList([...jobsList]);
        // }
        console.log("filtered", ((filteredJobList) => filteredJobList)());
    }, [jobsList, statusList, jobsList.length, filterString, statusFilter]);

    /* Initialization state of all checkboxes to false
     * CONDITION: jobsList.length changed
     */
    useEffect(() => {
        console.log("useEffect => setCheckedState");
        if (jobsList.length === 0) {
            console.log("...jobsList.length === 0 exiting");
            return;
        }
        setCheckedState(
            jobsList.map((job) => {
                return { id: job.id, state: false };
            })
        );
    }, [jobsList, jobsList.length]);

    useEffect(() => {
        console.log("useEffect => setCheckedState + setPagesTotalAmount");

        const jobs_per_page: number = Math.floor(
            (height - headerHeight - 320) / 56
        );

        if (jobs_per_page < 3) {
            setJobsPerPage(3);
        } else {
            setJobsPerPage(jobs_per_page);
        }

        setPagesTotalAmount(Math.ceil(filteredJobList.length / jobsPerPage));
        console.log("jobsPerPage", jobsPerPage);
        console.log("pagesTotalAmount: ", pagesTotalAmount);
    }, [
        filteredJobList.length,
        height,
        jobsPerPage,
        pagesTotalAmount,
        setJobsPerPage,
        setPagesTotalAmount,
        headerHeight,
    ]);

    /* Last page calculation after window resizing */
    useEffect(() => {
        console.log("useEffect => setCurrentPage");

        /* Checking for useless actions:
         * if pagesTotalAmount === 0 doing nothing
         */
        if (pagesTotalAmount === 0) {
            console.log("...pagesTotalAmount === 0 exiting");
            return;
        }

        if (currentPage >= pagesTotalAmount)
            setCurrentPage(pagesTotalAmount - 1);
        if (currentPage < 0) setCurrentPage(0);
    }, [filteredJobList.length, pagesTotalAmount, currentPage, setCurrentPage]);

    const handleCheckboxChange = (position: number) => {
        if (!checkedState) return false;

        const updatedCheckedState: CheckboxSelect[] = checkedState.map(
            (checkElem) =>
                checkElem.id === position
                    ? { id: position, state: !checkElem.state }
                    : checkElem
        );
        setCheckedState(updatedCheckedState);
        return true;
    };

    /* Handling deleting one job */
    const handleDelete = async (id: number) => {
        deleteMutation.mutate(id);
    };

    /* Handling deleting group of jobs */
    const handleBulkDelete = () => {
        checkedState.forEach((checkElem) => {
            if (checkElem.state) {
                deleteMutation.mutate(checkElem.id);
            }
        });
        setCheckAll(false);
    };

    /* Waiting for data arrival */
    if (((jobsList: JobItem[]) => jobsList).length === 0) {
        console.log("waiting for data arrival");
        return null;
    }

    /* If we have not any jobs in list - don't select any jobs */
    // if (jobsList.length !== 0) {
    //     !selectedJob ? setSelectedJob(jobsList[0].id) : undefined;
    // }

    return (
        <div className="mx-8 flex grow flex-col md:mx-0">
            <ModalAddJob modalAddJobForm={modalAddJobForm} />
            <ModalConfirmation
                modalConfirmation={modalConfirmation}
                acceptFunc={acceptFunc}
            />
            <div className="mb-5 flex flex-col">
                <StatusSort
                    statusFilter={statusFilter}
                    setStatusFilter={setStatusFilter}
                />

                <div className="flex justify-between gap-x-8 bg-base-200 pb-0 pt-5">
                    <div className="flex w-2/3 flex-row items-center justify-start">
                        <input
                            type="checkbox"
                            checked={checkAll}
                            onChange={() => {
                                if (
                                    ((filteredJobList: JobItem[]) =>
                                        filteredJobList).length !== 0
                                ) {
                                    setCheckedState(
                                        checkedState.map(
                                            (checkItem: CheckboxSelect) => {
                                                filteredJobList
                                                    .slice(
                                                        currentPage *
                                                            jobsPerPage,
                                                        currentPage *
                                                            jobsPerPage +
                                                            jobsPerPage
                                                    )
                                                    .forEach(
                                                        (
                                                            jobOnScreen: JobItem
                                                        ) => {
                                                            if (
                                                                jobOnScreen.id ===
                                                                checkItem.id
                                                            )
                                                                checkItem.state =
                                                                    !checkAll;
                                                        }
                                                    );
                                                return checkItem;
                                            }
                                        )
                                    );
                                    setCheckAll(!checkAll);
                                }
                            }}
                            className="checkbox my-auto ml-6 size-5 shrink-0 rounded-none"
                            id={"custom-checkbox-select-all"}
                        />

                        <h2 className="ml-6 hidden text-lg font-light text-neutral lg:block xl:block">
                            All applied positions
                        </h2>
                        <h2 className="ml-6 block text-lg font-light text-neutral lg:hidden xl:hidden">
                            All
                        </h2>
                    </div>

                    <div className="flex flex-row justify-end">
                        <button
                            onClick={() => handleBulkDelete()}
                            className={`${
                                checkedState.every(
                                    (checkElem) => !checkElem.state
                                )
                                    ? "hidden"
                                    : ""
                                // eslint-disable-next-line indent
                            } btn btn-error btn-sm mr-0 rounded-none`}
                        >
                            Delete selected
                        </button>

                        <button
                            onClick={() => modalAddJobForm.current?.showModal()}
                            className={`btn btn-outline btn-success btn-sm mr-6 rounded-none ${
                                checkedState.every(
                                    (checkElem) => !checkElem.state
                                )
                                    ? "block"
                                    : "hidden"
                            }`}
                        >
                            Add
                        </button>

                        <div
                            className={`${
                                checkedState.every(
                                    (checkElem) => !checkElem.state
                                )
                                    ? "block"
                                    : "hidden"
                            }`}
                        >
                            <SearchField
                                filterString={filterString}
                                setFilterString={setFilterString}
                            />
                        </div>
                    </div>
                </div>

                {/* <hr /> */}

                {jobsList.length === 0 ? (
                    <div className="flex flex-row justify-center p-2">
                        <p className="prose">
                            Jobs not found
                            <br />
                            Press Add button to add first applied vacancy
                        </p>
                    </div>
                ) : (
                    <ul role="list" className="">
                        {filteredJobList
                            .slice(
                                currentPage * jobsPerPage,
                                currentPage * jobsPerPage + jobsPerPage
                            )
                            .map((jobItem) => (
                                <li
                                    key={jobItem.id}
                                    className={`my-4 flex max-h-14 min-h-14 justify-between gap-x-6 bg-base-100 shadow  last:mb-0 hover:bg-primary-content
                                    ${
                                        selectedJob === jobItem.id
                                            ? "-ml-[4px] border-l-4 border-solid border-primary"
                                            : ""
                                    }`}
                                >
                                    <input
                                        type="checkbox"
                                        checked={
                                            checkedState.find(
                                                (stateElem: CheckboxSelect) =>
                                                    stateElem.id === jobItem.id
                                            )?.state || false
                                        }
                                        onChange={() =>
                                            handleCheckboxChange(jobItem.id)
                                        }
                                        className="checkbox my-auto ml-6 size-5 shrink-0 rounded-none"
                                        id={`custom-checkbox-${jobItem.id}`}
                                    />

                                    <div
                                        onClick={() =>
                                            setSelectedJob(jobItem.id)
                                        }
                                        className="flex flex-1 gap-x-4"
                                    >
                                        <div className="flex flex-1 items-center">
                                            <p className="line-clamp-2 text-sm text-neutral">
                                                {jobItem.job_title}
                                            </p>

                                            {/* <div className="flex gap-x-4"> */}
                                            {/* <p className="mt-1 text-xs leading-5 text-secondary">
                                                    Applied date:{" "}
                                                    <time dateTime={jobItem.date_of_apply.toString()}>
                                                        {jobItem.date_of_apply.split("T")[0]}
                                                    </time>
                                                </p> */}
                                            {/* <p className="line-clamp-1 mt-1 text-xs text-base-content">
                                                    {jobItem.job_desc}
                                                </p> */}
                                            {/* </div> */}
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedJob(jobItem.id);
                                            navigate(
                                                `detailview/${jobItem.id}`,
                                                { replace: true }
                                            );
                                        }}
                                        className="my-auto w-5"
                                    >
                                        <img src={editIcon}></img>
                                    </button>
                                    <button
                                        onClick={() => {
                                            setAcceptFunc(
                                                () => () =>
                                                    handleDelete(jobItem.id)
                                            );
                                            modalConfirmation.current?.showModal();
                                        }}
                                        className="my-auto mr-6 w-5"
                                    >
                                        <img
                                            className=""
                                            src={thrashIcon}
                                        ></img>
                                    </button>
                                </li>
                            ))}
                    </ul>
                )}
            </div>
            {pagesTotalAmount > 0 && (
                <PaginationBox
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    pagesTotalAmount={pagesTotalAmount}
                />
            )}
        </div>
    );
}
