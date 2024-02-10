import React from "react";
import AddJobForm from "./AddJobForm";
import { JobItem } from "../../../types";

interface Props {
  modalAddJobForm: React.RefObject<HTMLDialogElement>;
  jobsList: JobItem[];
  setJobsList: React.Dispatch<React.SetStateAction<JobItem[]>>;
}

const ModalAddJob = ({ modalAddJobForm, jobsList, setJobsList }: Props) => {
  return (
    <dialog ref={modalAddJobForm} id="modal_add_job" className="modal">
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
  );
};

export default ModalAddJob;
