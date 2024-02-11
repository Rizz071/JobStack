import React from "react";
import { useEffect, useState } from "react";
import { JobItem } from "../../types";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";

// interface Props {
//   //   job_id: number;
// }

export default function DetailJobView() {
  const [currentJob, setCurrentJob] = useState<JobItem>();

  const [jobDescription, setJobDescription] = useState<string>("");

  const { id } = useParams();
  const navigate = useNavigate();

  // const [width, setWidth] = useState(window.innerWidth);
  //   const [height, setHeight] = useState(window.innerHeight);
  //   const updateDimensions = () => {
  //     // setWidth(window.innerWidth);
  //     setHeight(window.innerHeight);
  //   };
  //   useEffect(() => {
  //     window.addEventListener("resize", updateDimensions);
  //     return () => window.removeEventListener("resize", updateDimensions);
  //   }, []);

  /* Requesting data from server via REST API */
  useEffect(() => {
    void (async () => {
      try {
        const result = await axios.get<JobItem>(
          `http://127.0.0.1:3001/api/job/${id}`
        );

        if (
          !result ||
          typeof result !== "object" ||
          !result.data ||
          !("data" in result) ||
          typeof result.data !== "object"
        )
          throw new Error("error while retrieving job list from server");

        setCurrentJob(result.data);
      } catch (error) {
        if (error instanceof Error) {
          throw new Error("unknown server error", error);
        }
      }
    })();
  }, []);

  //   useEffect(() => {
  //     if (((jobsList: JobItem[]) => jobsList).length !== 0) {
  //       setFilteredJobList(
  //         jobsList.filter(
  //           (jobItem) =>
  //             jobItem.job_title
  //               .toLowerCase()
  //               .includes(filterString.toLowerCase()) ||
  //             jobItem.job_desc.toLowerCase().includes(filterString.toLowerCase())
  //         )
  //       );
  //     }
  //   }, [jobsList.length, filterString]);

  //   useEffect(() => {
  //     const jobs_per_page: number = Math.floor((height - 200) / 80);

  //     // if (jobs_per_page < 3) {
  //     //   setJobsPerPage(3);
  //     // } else {
  //     //   setJobsPerPage(jobs_per_page);
  //     // }
  //     setPagesTotalAmount(Math.ceil(filteredJobList.length / jobsPerPage));
  //   }, [jobsList.length, height, filteredJobList]);

  /* Last page calculaion after window resizing */
  //   useEffect(() => {
  //     if (currentPage >= pagesTotalAmount) setCurrentPage(pagesTotalAmount - 1);
  //     if (currentPage < 0) setCurrentPage(0);
  //   }, [pagesTotalAmount]);

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

      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          "unknown server error occured while attemped to delete item from server",
          error
        );
      }
    }
  };

  const handleSave = async (id: number) => {
    if (!currentJob) return;

    const jobToPut: JobItem = {
      ...currentJob,
      job_desc: jobDescription,
    };

    try {
      const response: unknown = await axios.put<JobItem>(
        `http://127.0.0.1:3001/api/job/${id}`,
        jobToPut
      );

      /* Narrowing response from server and checking code 204 */
      if (
        !response ||
        typeof response !== "object" ||
        !("status" in response) ||
        response.status !== 201
      )
        throw new Error("error while deleting entity");

      navigate("/");
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          "unknown server error occured while attemped to delete item from server",
          error
        );
      }
    }
  };

  /* Waiting for data arrival */
  if (!currentJob) return null;

  return (
    <div className="border-md flex h-[85vh] flex-col rounded-md shadow-xl">
      <div className="mt-6 flex flex-row justify-between rounded-t-md bg-neutral py-2">
        <div className="flex w-1/3 flex-row justify-start">
          <h2 className="ml-4 text-xl font-light text-white">
            Detail job view - Raw data
          </h2>
        </div>

        <div className="flex w-1/3 shrink flex-row justify-end align-baseline">
          <button
            onClick={() => handleDelete(Number(id))}
            className="btn btn-error btn-sm my-auto mr-4 w-1/3 rounded-md"
          >
            Delete
          </button>
          <button
            onClick={() => handleSave(Number(id))}
            className="btn btn-primary btn-sm my-auto mr-4  w-1/3 rounded-md"
          >
            Save
          </button>
          <button
            onClick={() => navigate("/")}
            className="btn btn-primary btn-sm my-auto mr-4  w-1/3 rounded-md"
          >
            Cancel
          </button>
        </div>
      </div>

      {!currentJob ? (
        <p className=" bg-white p-2 text-sm font-semibold leading-6 text-gray-900">
          Job not found
        </p>
      ) : (
        <div className="flex h-full w-full flex-col">
          <div className="label">
            <span className="label">Your bio</span>
            <span className="label-text-alt">Alt label</span>
          </div>
          <textarea
            id="job_title_desc"
            name="job_title_desc"
            className="textarea textarea-primary resize-none rounded-none"
            defaultValue={`${currentJob.job_title}`}
            onChange={(event) => setJobDescription(event.target.value)}
          />

          <textarea
            id="job_detail_desc"
            name="job_detail_desc"
            className="textarea textarea-primary h-full resize-none rounded-none rounded-b-md"
            defaultValue={`${currentJob.job_desc}`}
            onChange={(event) => setJobDescription(event.target.value)}
          />
        </div>
      )}
    </div>
  );
}
