import { useEffect, useState } from "react";
import { JobItem } from "../../types";
import axios from "axios";
import thrashIcon from "../../assets/icons/thrash.svg";
import editIcon from "../../assets/icons/edit.svg";
import SearchField from "./SearchField";

interface Props {
  filterString: string;
  jobsList: JobItem[];
  setFilterString: React.Dispatch<React.SetStateAction<string>>;
  setJobsList: React.Dispatch<React.SetStateAction<JobItem[]>>;
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
}: Props) {
  const [deleteAllButtonDisabled, setDeleteAllButtonDisabled] =
    useState<boolean>(false);

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

  return (
    <div className="mb-5 rounded-xl p-2 shadow-blue-950">
      <div className="rounded-lg border-b border-l border-r">
        <div className="mt-4 flex flex-row justify-between  rounded-t-lg bg-gray-800 py-4">
          <h2 className="ml-4 text-3xl font-extralight leading-7 text-white">
            Jobs list
          </h2>
          {/* <label
              htmlFor="search_jobs"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Search in saved jobs
            </label> */}
          <div className="flex flex-row">
            <button
              // onClick={void () => void}
              className="mr-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Add new
              {/* <img src={thrashIcon}></img> */}
            </button>
            <button
              disabled={
                checkedState.every((checkElem) => !checkElem.state)
                  ? true
                  : false
              }
              onClick={() => handleBulkDelete()}
              className="mr-6 rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600 disabled:bg-gray-500"
            >
              Delete selected
              {/* <img src={thrashIcon}></img> */}
            </button>
            {/* <div className="my-auto mr-4">
              <input
                placeholder="Search"
                type="text"
                name="search_jobs"
                id="search_jobs"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={filterString}
                onChange={(event) => setFilterString(event.target.value)}
              />
            </div> */}
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
            jobItem.job_desc.toLowerCase().includes(filterString.toLowerCase())
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
                    className="dark:bg-white-800 my-auto ml-6 size-6 shrink-0 rounded  border-gray-200 text-blue-600 focus:ring-blue-500 disabled:pointer-events-none disabled:opacity-50 dark:border-gray-700 dark:checked:border-blue-500 dark:checked:bg-blue-500 dark:focus:ring-offset-gray-800"
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
  );
}
