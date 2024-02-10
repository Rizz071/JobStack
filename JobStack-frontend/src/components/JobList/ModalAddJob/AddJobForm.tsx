import React, { SyntheticEvent, useState } from "react";
import { JobItem } from "../../../types";
import axios from "axios";

interface Props {
  jobsList: JobItem[];
  setJobsList: React.Dispatch<React.SetStateAction<JobItem[]>>;
}

const AddJobForm = ({ jobsList, setJobsList }: Props) => {
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
        setJobsList(jobsList.concat(response.data));
      } catch (error) {
        if (error instanceof Error) {
          console.log(error);
        }
      }
    })();
  };

  return (
    <div>
      <div className="flex flex-col">
        <label htmlFor="job_title" className="label-text mt-6">
          Job header
        </label>
        <div className="mt-2">
          <input
            type="text"
            name="job_title"
            id="job_title"
            //   autoComplete="given-name"
            className="input input-sm input-bordered input-primary w-full  rounded-md"
            value={newJobTitle}
            onChange={(event) => setNewJobTitle(event.target.value)}
          />
        </div>

        <label htmlFor="job_desc" className="label-text mt-6">
          Long job description
        </label>
        <div className="mt-2">
          <textarea
            id="job_desc"
            name="job_desc"
            rows={6}
            className="textarea textarea-primary w-full  rounded-md"
            value={newJobDesc}
            onChange={(event) => setNewJobDesc(event.target.value)}
          />
        </div>
        <p className="label-text-alt">Paste here all of a description</p>
      </div>

      <div className="mt-4 flex justify-between ">
        <button
          type="submit"
          className="btn btn-neutral btn-sm mr-6 rounded-md"
        >
          Cancel
        </button>
        <button
          type="button"
          onClick={handleSubmit}
          className="btn btn-primary btn-sm rounded-md"
        >
          Save
        </button>
        <button type="submit" className="btn btn-primary btn-sm rounded-md">
          Save and close
        </button>
      </div>
    </div>
  );
};

export default AddJobForm;
