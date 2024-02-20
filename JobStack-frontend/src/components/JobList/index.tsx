import React from "react";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { JobItem } from "../../types";
import thrashIcon from "../../assets/icons/thrash.svg";
import editIcon from "../../assets/icons/edit.svg";
import SearchField from "./SearchField";
import PaginationBox from "./PaginationBox";
import ModalAddJob from "./AddModalJob";
import { useNavigate } from "react-router-dom";
import serviceJobs from "../../../services/serviceJobs";
import { useQueryClient, useMutation } from "@tanstack/react-query";

interface Props {
    jobsList: JobItem[];
    // setJobsList: React.Dispatch<React.SetStateAction<JobItem[]>>;
    handleShowAddJobForm: MouseEventHandler<HTMLElement>;
    pagesTotalAmount: number;
    setPagesTotalAmount: React.Dispatch<React.SetStateAction<number>>;
    currentPage: number;
    setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
    jobsPerPage: number;
    setJobsPerPage: React.Dispatch<React.SetStateAction<number>>;
    setSelectedJob: React.Dispatch<React.SetStateAction<number | undefined>>;
}

interface CheckboxSelect {
    id: number;
    state: boolean;
}

export default function JobsList({
    jobsList,
    // setJobsList,
    pagesTotalAmount,
    setPagesTotalAmount,
    currentPage,
    setCurrentPage,
    jobsPerPage,
    setJobsPerPage,
    setSelectedJob
}: Props) {
    const modalAddJobForm = useRef<HTMLDialogElement>(null);
    const [filteredJobList, setFilteredJobList] = useState<JobItem[]>([]);
    const [filterString, setFilterString] = useState<string>("");
    const [checkAll, setCheckAll] = useState<boolean>(false);

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const deleteMutation = useMutation({
        mutationFn: (id: number) => serviceJobs.deleteJob(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["jobs"] });
        }
    });

    // const [width, setWidth] = useState(window.innerWidth);
    const [height, setHeight] = useState(window.innerHeight);
    const updateDimensions = () => {
        // setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    };
    useEffect(() => {
        console.log("useEffect => addEventListener resize");
        window.addEventListener("resize", updateDimensions);
        return () => window.removeEventListener("resize", updateDimensions);
    }, []);

    const [checkedState, setCheckedState] = useState<CheckboxSelect[]>([]);

    useEffect(() => {
        console.log("useEffect => setFilteredJobList");
        if (jobsList.length === 0) {
            console.log("...jobsList.length === 0 exiting");
            return;
        }
        if (filterString) {
            console.log("filterString=true");
            setFilteredJobList(
                (() => jobsList)().filter(
                    (jobItem: JobItem) =>
                        jobItem.job_title
                            .toLowerCase()
                            .includes(filterString.toLowerCase()) ||
                        jobItem.job_desc.toLowerCase().includes(filterString.toLowerCase())
                )
            );
        } else {
            setFilteredJobList([...jobsList]);
        }
        console.log("filtered", ((filteredJobList) => filteredJobList)());
    }, [jobsList, jobsList.length, filterString]);

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

        const jobs_per_page: number = Math.floor((height - 320) / 80);

        if (jobs_per_page < 3) {
            setJobsPerPage(3);
        } else {
            setJobsPerPage(jobs_per_page);
        }

        setPagesTotalAmount(Math.ceil(filteredJobList.length / jobsPerPage));
        console.log("jobsPerPage", jobsPerPage);
        console.log("pagesTotalAmount: ", pagesTotalAmount);
    }, [filteredJobList.length, height, jobsPerPage, pagesTotalAmount, setJobsPerPage, setPagesTotalAmount]);

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

        if (currentPage >= pagesTotalAmount) setCurrentPage(pagesTotalAmount - 1);
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

    return (
        <div className="flex w-full flex-col">

            <ModalAddJob modalAddJobForm={modalAddJobForm} />
            <div className="mb-5 mt-8 flex w-full flex-col shadow-xl">
                <div className="flex flex-row justify-between bg-primary py-2">
                    <div className="flex flex-row justify-start">
                        <input
                            type="checkbox"
                            checked={checkAll}
                            onChange={() => {
                                if (
                                    ((filteredJobList: JobItem[]) => filteredJobList).length !== 0
                                ) {
                                    setCheckedState(
                                        checkedState.map((checkItem: CheckboxSelect) => {
                                            filteredJobList
                                                .slice(
                                                    currentPage * jobsPerPage,
                                                    currentPage * jobsPerPage + jobsPerPage
                                                )
                                                .forEach((jobOnScreen: JobItem) => {
                                                    if (jobOnScreen.id === checkItem.id)
                                                        checkItem.state = !checkAll;
                                                });
                                            return checkItem;
                                        })
                                    );
                                    setCheckAll(!checkAll);
                                }
                            }}
                            className="checkbox-primary checkbox my-auto ml-6 size-6 shrink-0 rounded-md"
                            id={"custom-checkbox-select-all"}
                        />
                        <h2 className="ml-6 text-xl font-light text-neutral-content">
                            Applied jobs
                        </h2>
                    </div>

                    <div className="flex w-1/3 flex-row justify-end">
                        <button
                            onClick={() => handleBulkDelete()}
                            className={`${checkedState.every((checkElem) => !checkElem.state)
                                ? "hidden"
                                : ""
                                // eslint-disable-next-line indent
                                } btn btn-error btn-sm  mr-6`}
                        >
                            Delete selected
                        </button>
                        <button
                            onClick={() => modalAddJobForm.current?.showModal()}
                            className="btn btn-sm  mr-6 rounded-md"
                        >
                            Add new
                        </button>

                        <SearchField
                            filterString={filterString}
                            setFilterString={setFilterString}
                        />
                    </div>
                </div>
                {jobsList.length === 0 ? (
                    <div className="flex flex-row bg-base-100 w-full rounded-b-lg p-2 justify-center">
                        <p className="prose">Jobs not found</p>
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
                                    className="flex max-h-20 min-h-20 justify-between gap-x-6  border-black bg-base-100 last:rounded-b-lg hover:bg-base-200"
                                >
                                    <input
                                        type="checkbox"
                                        checked={
                                            checkedState.find(
                                                (stateElem: CheckboxSelect) =>
                                                    stateElem.id === jobItem.id
                                            )?.state || false
                                        }
                                        onChange={() => handleCheckboxChange(jobItem.id)}
                                        className="checkbox-primary checkbox my-auto ml-6 size-6 shrink-0 rounded-md"
                                        id={`custom-checkbox-${jobItem.id}`}
                                    />

                                    <div
                                        onClick={() =>

                                            setSelectedJob(jobItem.id)
                                        }
                                        className="my-4 min-w-0 flex-1 gap-x-4"
                                    >
                                        <div className="max-w-26 min-w-0 flex-auto">
                                            <p className="truncate text-sm font-semibold leading-6 text-base-content">
                                                {jobItem.job_title}
                                            </p>

                                            <div className="flex gap-x-4">
                                                <p className="mt-1 text-xs leading-5 text-base-content">
                                                    Applied date:{" "}
                                                    <time dateTime={jobItem.date_of_apply.toString()}>
                                                        {jobItem.date_of_apply.split("T")[0]}
                                                    </time>
                                                </p>
                                                <p className="mt-1 text-xs leading-5 text-base-content">
                                                    Current status: {jobItem.current_status_desc}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                    <button
                                        onClick={() => {
                                            setSelectedJob(jobItem.id);
                                            navigate(`/detailview/${jobItem.id}`, { replace: true });
                                        }
                                        }
                                        className="my-auto w-6"
                                    >
                                        <img src={editIcon}></img>
                                    </button>
                                    <button
                                        onClick={() => handleDelete(jobItem.id)}
                                        className="my-auto mr-6 w-6"
                                    >
                                        <img src={thrashIcon}></img>
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
