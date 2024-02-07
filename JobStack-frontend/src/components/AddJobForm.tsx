import { SyntheticEvent, useState } from "react";
import { JobItem, NewJob } from "../types";
import axios from "axios";

interface Props {
  jobsList: JobItem[];
  setJobsList: React.Dispatch<React.SetStateAction<JobItem[]>>;
}

export default function AddJobForm({ jobsList, setJobsList }: Props) {
  // const [newJob, setNewJob] = useState<NewJob>();
  const [newJobTitle, setNewJobTitle] = useState<string>("");
  const [newJobDesc, setNewJobDesc] = useState<string>("");

  const handleSubmit = (event: SyntheticEvent) => {
    event.preventDefault();

    void (async () => {
      try {
        const response = await axios.post(
          "http://127.0.0.1:3001/api/jobs/1",
          {
            job_title: newJobTitle,
            job_desc: newJobDesc,
            date_of_apply: new Date().toISOString(),
            current_status_desc: "Just applyed",
            active: true,
          },
          {
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        console.log(response);
        setJobsList(jobsList.concat(response.data));
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    })();
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-12">
        <div className="border-y border-gray-900/10 pb-12">
          <h2 className="text-base font-semibold leading-7 text-gray-900">
            New job vacancy
          </h2>
          {/* <p className="mt-1 text-sm leading-6 text-gray-600">
            Use a permanent address where you can receive mail.
          </p> */}

          <div className="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="sm:col-span-3">
              <label
                htmlFor="job_title"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Job vacancy title
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="job_title"
                  id="job_title"
                  //   autoComplete="given-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={newJobTitle}
                  onChange={(event) => setNewJobTitle(event.target.value)}
                />
              </div>
            </div>

            <div className="sm:col-span-3">
              <label
                htmlFor="contact"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Contact person
              </label>
              <div className="mt-2">
                <input
                  type="text"
                  name="contact"
                  id="contact"
                  //   autoComplete="family-name"
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                />
              </div>
            </div>

            <div className="col-span-full">
              <label
                htmlFor="job_desc"
                className="block text-sm font-medium leading-6 text-gray-900"
              >
                Long job vacancy description
              </label>
              <div className="mt-2">
                <textarea
                  id="job_desc"
                  name="job_desc"
                  rows={6}
                  className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                  value={newJobDesc}
                  onChange={(event) => setNewJobDesc(event.target.value)}
                />
              </div>
              <p className="text-sm leading-6 text-gray-600">
                Paste here all of a description
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-2 flex items-center justify-end gap-x-6">
        {/* <button
          type="button"
          className="text-sm font-semibold leading-6 text-gray-900"
        >
          Cancel
        </button> */}
        <button
          type="submit"
          className="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Save
        </button>
      </div>
    </form>
  );
}
