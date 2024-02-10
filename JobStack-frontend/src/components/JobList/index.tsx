import { MouseEventHandler, useEffect, useRef, useState } from "react";
import { JobItem } from "../../types";
import axios from "axios";
import thrashIcon from "../../assets/icons/thrash.svg";
import editIcon from "../../assets/icons/edit.svg";
import SearchField from "./SearchField";
import AddJobForm from "../AddJobForm";
import PaginationBox from "./PaginationBox";

interface Props {
  filterString: string;
  jobsList: JobItem[];
  setFilterString: React.Dispatch<React.SetStateAction<string>>;
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
  filterString,
  setFilterString,
  jobsList,
  setJobsList,
  handleShowAddJobForm,
  pagesTotalAmount,
  setPagesTotalAmount,
  currentPage,
  setCurrentPage,
  jobsPerPage,
  setJobsPerPage,
}: Props) {
  const modalAddJobForm = useRef<HTMLDialogElement>(null);
  const [pages, setPages] = useState<number>(0);

  const [width, setWidth] = useState(window.innerWidth);
  const [height, setHeight] = useState(window.innerHeight);
  const updateDimensions = () => {
    setWidth(window.innerWidth);
    setHeight(window.innerHeight);
  };
  useEffect(() => {
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  const [checkedState, setCheckedState] = useState<CheckboxSelect[]>([]);
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

  const handleCheckboxChange = (position: number) => {
    if (!checkedState) return false;

    const updatedCheckedState: CheckboxSelect[] = checkedState.map(
      (checkElem) =>
        checkElem.id === position
          ? { id: position, state: !checkElem.state }
          : checkElem
    );
    setCheckedState([...updatedCheckedState]);
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
  };

  /* Waiting for data arrival */
  if (!jobsList) return null;

  useEffect(() => {
    setCheckedState((jobList) =>
      jobsList.map((job) => {
        return { id: job.id, state: false };
      })
    );
  }, [jobsList]);

  const jobs_per_page: number = Math.floor((height - 200) / 80);
  console.log(jobs_per_page);

  if (jobs_per_page < 3) {
    setJobsPerPage(3);
  } else {
    setJobsPerPage(jobs_per_page);
  }
  setPagesTotalAmount(
    Math.ceil(
      jobsList.filter(
        (jobItem) =>
          jobItem.job_title
            .toLowerCase()
            .includes(filterString.toLowerCase()) ||
          jobItem.job_desc.toLowerCase().includes(filterString.toLowerCase())
      ).length / jobsPerPage
    )
  );

  return (
    <>
      <dialog ref={modalAddJobForm} id="my_modal_3" className="modal">
        <div className="modal-box w-1/3 max-w-none  rounded-md">
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <button className="btn btn-circle btn-ghost btn-sm absolute right-2 top-2">
              ✕
            </button>
            <h3 className="text-lg font-bold">New job vacancy</h3>
            {/* <p className="py-4">Press ESC key or click on ✕ button to close</p> */}
            <AddJobForm jobsList={jobsList} setJobsList={setJobsList} />
          </form>
        </div>
      </dialog>

      <div className="mb-5 shadow-xl">
        <div className="border-b border-l border-r">
          <div className="mt-6 flex flex-row justify-between rounded-t-md bg-neutral py-2">
            <div className="flex w-1/3 flex-row justify-start">
              <h2 className="ml-4 text-xl font-light text-white">
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
                className="btn btn-primary btn-sm  mr-6 rounded-md"
              >
                Add new
              </button>

              <SearchField
                filterString={filterString}
                setFilterString={setFilterString}
              />
            </div>
          </div>
          {jobsList.filter(
            (jobItem) =>
              jobItem.job_title
                .toLowerCase()
                .includes(filterString.toLowerCase()) ||
              jobItem.job_desc
                .toLowerCase()
                .includes(filterString.toLowerCase())
          ).length === 0 ? (
            <p className="p-2 text-sm font-semibold leading-6 text-gray-900">
              Jobs not found
            </p>
          ) : (
            <ul role="list" className="divide-y divide-gray-300">
              {jobsList
                .filter(
                  (jobItem) =>
                    jobItem.job_title
                      .toLowerCase()
                      .includes(filterString.toLowerCase()) ||
                    jobItem.job_desc
                      .toLowerCase()
                      .includes(filterString.toLowerCase())
                )
                .slice(
                  currentPage * jobsPerPage,
                  currentPage * jobsPerPage + jobsPerPage
                )
                .map((jobItem) => (
                  <li
                    key={jobItem.id}
                    className="flex justify-between gap-x-6 odd:bg-white even:bg-gray-100"
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
                      className="checkbox-primary my-auto ml-6 size-6 shrink-0"
                      id={`custom-checkbox-${jobItem.id}`}
                    />

                    <div className="my-4 min-w-0 flex-1 gap-x-4">
                      <div className="min-w-0 flex-auto">
                        <p className="text-sm font-semibold leading-6 text-gray-900">
                          {jobItem.job_title}
                        </p>

                        <div className="flex gap-x-4">
                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            Applyed date:{" "}
                            <time dateTime={jobItem.date_of_apply.toString()}>
                              {jobItem.date_of_apply.split("T")[0]}
                            </time>
                          </p>

                          <p className="mt-1 text-xs leading-5 text-gray-500">
                            Current status: {jobItem.current_status_desc}
                          </p>
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={() => handleDelete(jobItem.id)}
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
      </div>
      <div className="flex justify-end">
        {jobsList.length !== 0 && (
          <PaginationBox
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
            pagesTotalAmount={pagesTotalAmount}
          />
        )}
      </div>
    </>
  );
}
