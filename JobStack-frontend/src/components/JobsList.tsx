import { useEffect, useState } from "react";
import { JobItem } from "../types";
import axios from "axios";

interface Props {
  jobsList: JobItem[];
  setJobsList: React.Dispatch<React.SetStateAction<JobItem[]>>;
}

export default function JobsList({ jobsList, setJobsList }: Props) {
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

  /* Waiting for data arrival */
  if (!jobsList) return null;

  return (
    <div className="mb-5 rounded-xl p-2 shadow-blue-950">
      <h2 className="text-base font-semibold leading-7 text-gray-900">
        Jobs list
      </h2>
      <ul role="list" className="divide-y divide-gray-100">
        {jobsList.map((jobItem) => (
          <li key={jobItem.id} className="flex justify-between gap-x-6 py-5">
            <div className="flex min-w-0 gap-x-4">
              {/* <img
                className="h-12 w-12 flex-none rounded-full bg-gray-50"
                src={person.imageUrl}
                alt=""
              /> */}
              <div className="min-w-0 flex-auto">
                <p className="text-sm font-semibold leading-6 text-gray-900">
                  {jobItem.id} {jobItem.job_title}
                </p>
                {/* <p className="mt-1 truncate text-xs leading-5 text-gray-500">
                  {jobItem.job_desc}
                </p> */}
              </div>
            </div>
            <div className="hidden shrink-0 sm:flex sm:flex-col sm:items-end">
              <p className="text-sm leading-6 text-gray-900">
                Current status: {jobItem.current_status_desc}
              </p>

              <p className="mt-1 text-xs leading-5 text-gray-500">
                Applyed date:{" "}
                <time dateTime={jobItem.date_of_apply.toString()}>
                  {jobItem.date_of_apply.split("T")[0]}
                </time>
              </p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
