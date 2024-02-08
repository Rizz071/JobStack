import { useState } from "react";
import AddJobForm from "./components/AddJobForm";
import JobsList from "./components/JobList";
import NavBar from "./components/NavBar";
import { JobItem } from "./types";

function App() {
  const [jobsList, setJobsList] = useState<JobItem[]>([]);
  const [filterString, setFilterString] = useState<string>("");

  return (
    <>
      <NavBar />
      <div className="container mx-auto w-1/2">
        {/* <div className="flex flex-row"> */}
        {/* <div className="w-1/4">
            <SearchBox
              filterString={filterString}
              setFilterString={setFilterString}
            />
          </div> */}
        <div>
          <JobsList
            filterString={filterString}
            setFilterString={setFilterString}
            jobsList={jobsList}
            setJobsList={setJobsList}
          />
          <AddJobForm jobsList={jobsList} setJobsList={setJobsList} />
        </div>
      </div>
      {/* </div> */}
    </>
  );
}

export default App;
