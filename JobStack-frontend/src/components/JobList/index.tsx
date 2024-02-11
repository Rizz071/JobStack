import React from "react";
import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { JobItem } from "../../types";
import axios from "axios";
import thrashIcon from "../../assets/icons/thrash.svg";
import editIcon from "../../assets/icons/edit.svg";
import SearchField from "./SearchField";
import PaginationBox from "./PaginationBox";
import ModalAddJob from "./AddModalJob";
import { useNavigate } from "react-router-dom";

interface Props {
  jobsList: JobItem[];
  setJobsList: React.Dispatch<React.SetStateAction<JobItem[]>>;
  handleShowAddJobForm: MouseEventHandler<HTMLElement>;
  pagesTotalAmount: number;
  setPagesTotalAmount: React.Dispatch<React.SetStateAction<number>>;
  currentPage: number;
  setCurrentPage: React.Dispatch<React.SetStateAction<number>>;
  jobsPerPage: number;
  setJobsPerPage: React.Dispatch<React.SetStateAction<number>>;
}

interface CheckboxSelect {
  id: number;
  state: boolean;
}

export default function JobsList({
  jobsList,
  setJobsList,
  pagesTotalAmount,
  setPagesTotalAmount,
  currentPage,
  setCurrentPage,
  jobsPerPage,
  setJobsPerPage,
}: Props) {
  const modalAddJobForm = useRef<HTMLDialogElement>(null);
  const [filteredJobList, setFilteredJobList] = useState<JobItem[]>([]);
  const [filterString, setFilterString] = useState<string>("");
  const [checkAll, setCheckAll] = useState<boolean>(false);

  const navigate = useNavigate();

  // const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    // setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const [checkedState, setCheckedState] = useState<CheckboxSelect[]>([]);

  /* Requesting data from server via REST API */
  useEffect(() => {
    void (async () => {
      try {
        const result = await axios.get<JobItem[]>(
          "http://127.0.0.1:3001/api/jobs/1"
        );

        if (!result || !Array.isArray(result.data))
          throw new Error("error while retrieving job list from server");

        setJobsList(result.data);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error("unknown server error", error);
        }
      }
    })();
  }, []);

  useEffect(() => {
    if (((jobsList: JobItem[]) => jobsList).length !== 0) {
      setFilteredJobList(
        jobsList.filter(
          (jobItem) =>
            jobItem.job_title
              .toLowerCase()
              .includes(filterString.toLowerCase()) ||
            jobItem.job_desc.toLowerCase().includes(filterString.toLowerCase())
        )
      );
    }
  }, [jobsList.length, filterString]);

  /* Initialization state of  all checkboxes to false
   * CONDITION: jobsList.length changed
   */
  useEffect(() => {
    if (((jobsList: JobItem[]) => jobsList).length !== 0) {
      // console.log("Updating states of all checkboxes");
      setCheckedState(
        jobsList.map((job) => {
          return { id: job.id, state: false };
        })
      );
    }
  }, [jobsList.length]);

  useEffect(() => {
    const jobs_per_page: number = Math.floor((height - 200) / 80);

    if (jobs_per_page < 3) {
      setJobsPerPage(3);
    } else {
      setJobsPerPage(jobs_per_page);
    }
    setPagesTotalAmount(Math.ceil(filteredJobList.length / jobsPerPage));
  }, [jobsList.length, height, filteredJobList]);

  /* Last page calculaion after window resizing */
  useEffect(() => {
    if (currentPage >= pagesTotalAmount) setCurrentPage(pagesTotalAmount - 1);
    if (currentPage < 0) setCurrentPage(0);
  }, [pagesTotalAmount]);

  const handleCheckboxChange = (position: number) => {
    if (!checkedState) return false;

    const updatedCheckedState: CheckboxSelect[] = checkedState.map(
      (checkElem) =>
        checkElem.id === position
          ? { id: position, state: !checkElem.state }
          : checkElem
    );
    setCheckedState(updatedCheckedState);
  };

  const handleDelete = async (id: number) => {
    try {
      const response: unknown = await axios.delete(
        `http://127.0.0.1:3001/api/jobs/${id}`
      );

      /* Narrowing response from server and checking code 204 */
      if (
        !response ||
        typeof response !== "object" ||
        !("status" in response) ||
        response.status !== 204
      )
        throw new Error("error while deleting entity");

      setJobsList((jobsList) => jobsList.filter((job) => job.id !== id));
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          "unknown server error occured while attemped to delete item from server",
          error
        );
      }
    }
  };

  const handleBulkDelete = async () => {
    checkedState.forEach(async (checkElem) => {
      if (checkElem.state) {
        await handleDelete(checkElem.id);
      }
    });
    setCheckAll(false);
  };

  /* Waiting for data arrival */
  if (((jobsList: JobItem[]) => jobsList).length === 0) return null;

  return (
    <div className="flex w-4/5 flex-col">
      <ModalAddJob
        modalAddJobForm={modalAddJobForm}
        jobsList={jobsList}
        setJobsList={setJobsList}
      />
      <div className="mb-5 mt-8 flex w-full flex-col rounded-lg border border-neutral shadow-xl">
        <div className="flex flex-row justify-between rounded-t-md bg-neutral py-2">
          <div className="flex w-1/3 flex-row justify-start">
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
              id={`custom-checkbox-select-all`}
            />
            <h2 className="ml-6 text-xl font-light text-neutral-content">
              Applied jobs
            </h2>
          </div>

          <div className="flex w-1/3 flex-row justify-end">
            <button
              onClick={() => handleBulkDelete()}
              className={`${
                checkedState.every((checkElem) => !checkElem.state)
                  ? "hidden"
                  : ""
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
          <p className="bg-base-content p-2 text-sm font-semibold leading-6">
            Jobs not found
          </p>
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
                      navigate(`/detailview/${jobItem.id}`, { replace: true })
                    }
                    className="my-4 min-w-0 flex-1 gap-x-4"
                  >
                    <div className="max-w-26 min-w-0 flex-auto">
                      <p className="truncate text-sm font-semibold leading-6 text-base-content">
                        {jobItem.job_title}
                      </p>

                      <div className="flex gap-x-4">
                        <p className="mt-1 text-xs leading-5 text-base-content">
                          Applyed date:{" "}
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
                    onClick={() =>
                      navigate(`/detailview/${jobItem.id}`, { replace: true })
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
      {jobsList.length !== 0 && (
        <PaginationBox
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          pagesTotalAmount={pagesTotalAmount}
        />
      )}
    </div>
  );
}
