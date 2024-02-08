import { useEffect, useState } from "react";
import { JobItem } from "../types";
import axios from "axios";
import thrashIcon from "../assets/icons/thrash.svg";
import editIcon from "../assets/icons/edit.svg";

interface Props {
  filterString: string;
  setFilterString: React.Dispatch<React.SetStateAction<string>>;
}

export default function SearchBox({ filterString, setFilterString }: Props) {
  return (
    <div className="mb-5 p-2 shadow-blue-950">
      <div className="rounded-lg border-b border-l border-r">
        <h2 className="mt-4 rounded-t-lg bg-gray-800 p-4 text-3xl font-extralight leading-7 text-white">
          Search box
        </h2>

        <div className="mt-2">
          <div className="mb-2 p-2">
            <label
              htmlFor="search_jobs"
              className="block text-sm font-medium leading-6 text-gray-900"
            >
              Search in saved jobs
            </label>
            <div className="">
              <input
                type="text"
                name="search_jobs"
                id="search_jobs"
                //   autoComplete="given-name"
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                value={filterString}
                onChange={(event) => setFilterString(event.target.value)}
              />
            </div>
          </div>

          {/* <button
          onClick={() => handleDelete(jobItem.id)}
          className="my-auto w-6"
        >
          <img src={editIcon}></img>
        </button> */}
        </div>
      </div>
    </div>
  );
}
