import React from "react";

interface Props {
    filterString: string;
    setFilterString: React.Dispatch<React.SetStateAction<string>>;
}

const SearchField = ({ filterString, setFilterString }: Props) => {
    return (
        <div className="my-auto mr-0">
            <label className="input input-sm input-bordered my-auto flex items-center rounded-none pl-1">
                <input
                    placeholder="Search"
                    type="text"
                    name="search_jobs"
                    id="search_jobs"
                    className="input-ghost h-full w-full grow border-none"
                    value={filterString}
                    onChange={(event) => setFilterString(event.target.value)}
                />
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    className="h-4 w-4 opacity-70"
                >
                    <path
                        fillRule="evenodd"
                        d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                        clipRule="evenodd"
                    />
                </svg>
            </label>
        </div>
    );
};

export default SearchField;
