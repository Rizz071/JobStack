import { useState } from "react";
import AddJobForm from "./components/AddJobForm";
import JobsList from "./components/JobsList";
import NavBar from "./components/NavBar";
import { JobItem } from "./types";

function App() {
  const [jobsList, setJobsList] = useState<JobItem[]>([]);

  return (
    <>
      <NavBar />
      <div className="container mx-auto w-1/2">
        <JobsList jobsList={jobsList} setJobsList={setJobsList} />
        <AddJobForm jobsList={jobsList} setJobsList={setJobsList} />
      </div>
    </>
  );
}

export default App;
